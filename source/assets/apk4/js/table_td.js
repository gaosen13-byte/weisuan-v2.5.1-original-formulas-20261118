function 加强表格(name, event, event2, event3) { 
    this.名称 = name;
    var self = this;
    var lastClickedCell = null; // 记录上一次点击的单元格
    
    // 定义事件类型常量
    var SELECTED_ROWS_CHANGE = 'selectedRowsChange';
    var UNSELECTED_ROWS_CHANGE = 'unselectedRowsChange';
    // 定义选中状态的CSS类
    var SELECTED_ROW_CLASS = 'table-row-selected';
    // 定义单元格编辑状态的CSS类
    var EDITABLE_CELL_CLASS = 'table-cell-editing';
    // 定义禁用状态的CSS类
    var DISABLED_ROW_CLASS = 'table-row-disabled';
    
    // 创建样式表（合并所有样式）
    if (!document.getElementById('table-style')) {
        var style = document.createElement('style');
        style.id = 'table-style';
        style.textContent = `
            .table-row-selected {
                background-color: #e8f4ff !important;
            }
            .table-cell-editing {
                padding: 0 !important;
                border: none; 
            }
            .table-cell-editing input {
                width: 100%;
                height: 100%;
                border: none; 
                padding: 0 4px;
                margin: 0;
                box-sizing: border-box;
                background-color: transparent; 
                outline: none; 
            }
            .table-cell-editing input:focus {
                background-color: ""; /* 聚焦时浅色背景 */
            }
            th.table-cell-editing {
                cursor: text; /* 表头编辑时显示文本光标 */
            }
            .cell-clicked {
                background-color: #e8f4ff !important;
            }
            .table-row-disabled {
                background-color: #f5f5f5 !important;
                opacity: 0.7;
                cursor: not-allowed;
            }
            .table-row-disabled input[type="checkbox"] {
                cursor: not-allowed;
            }
            .table-row-disabled td, .table-row-disabled th {
                pointer-events: none; /* 禁用单元格的点击事件 */
            }
            .table-container {
                overflow-x: auto;
                white-space: nowrap;
                max-width: 100%;
                display: block; /* 确保滚动条正常显示 */
            }
        `;
        document.head.appendChild(style);
    }
    
	this.初始化容器 = function() {
        var table = document.getElementById(this.名称);
        if (!table.parentNode.classList.contains('table-container')) {
            var container = document.createElement('div');
            container.className = 'table-container';
            table.parentNode.replaceChild(container, table);
            container.appendChild(table);
        }
    };
	
    this.初始化 = function () {
        this.初始化容器(); 
    };
	
	
    // Base64编码函数
    function base64(content) {
        return window.btoa(unescape(encodeURIComponent(content)));         
    }
    // Excel数据处理函数
    function fixdata(data) {
        var o = "", l = 0, w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    }
      //组件命令：
        this.导入excel = function (f){//f为文件选择器返回的文件对象
			var rABS = true; //是否将文件读取为二进制字符串
			var reader = new FileReader();
		    var name = f.name;
		    reader.onload = function (e) {
		        var data = e.target.result;
		        var wb;
		        try {
		            if (rABS) {
		                wb = 解析Excel文件(data, false);
		            } else {
		                var arr = fixdata(data);
		                wb = 解析Excel文件(arr, false);
		            }
		        } catch (ex) {
		            //兼容兜底：WPS 另存为 HTML 数据表/混合格式时，再按字符串方式解析一次
		            try {
		                var s = rABS ? data : fixdata(data);
		                wb = XLSX.read(s, { type: "string" });
		            } catch (ex2) {
		                //识别WPS另存的HTML框架集（表格数据在.files子文件夹，单文件无法读取）
		                var 提示 = "导入Excel失败";
		                try {
		                    var probe = rABS ? data : fixdata(data);
		                    var pl = probe.toLowerCase();
		                    if (pl.indexOf("frameset") >= 0 || pl.indexOf("file-list") >= 0 || pl.indexOf("sheet001") >= 0) {
		                        提示 = "该文件是WPS另存的HTML框架集格式（表格数据在.files子文件夹中），无法直接导入；请用新版导出的XLS重新导入，或用Excel/WPS另存为xlsx再导入";
		                    }
		                } catch (e3) {}
		                console.error("导入Excel失败:", ex2, 提示);
		                //解析失败时回调一个空对象，触发页面友好降级（提示表格格式有误），避免空数组导致页面后续取行列数崩溃
		                if (event2 != null) event2([{}]);
		                return;
		            }
		        }
			if(event2!=null){
		        event2(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{
								head: 0,
								defval: ""//解决无法识别空内容的列
							}));//导入完毕事件 
				//返回的数据格式为json数组：[{"姓名":"张三","性别":"男","年龄":20},{"姓名":"李四","性别":"女","年龄":30},{"姓名":"王五","性别":"男","年龄":40}]
			}
		    };
		    if (rABS) reader.readAsBinaryString(f);
		    else reader.readAsArrayBuffer(f);
        }

        //解析Excel文件：兼容 WPS 保存的 HTML 数据表(.xls)、SpreadsheetML 2003 XML 与标准 xlsx/xls
        //说明：WPS 打开本组件导出的 HTML 数据表并保存后，文件会混入 XML 头；直接按二进制读取会被 SheetJS 误判为
        //XLML 而报 "could not find table"。这里先按内容特征分流：优先提取 table 标签强制按 HTML 解析。
        //尖括号用 String.fromCharCode(60)/(62) 构造，避免蓝鸟编译对尖括号的转义处理。
        function 解析Excel文件(data, isBase64) {
            var L60 = String.fromCharCode(60); //字符小于号
            var G62 = String.fromCharCode(62); //字符大于号
            var full = isBase64 ? atob(data) : data;
            //0) 标准二进制格式前置判断：PK=xlsx、D0CF11E0=xls(CFB)，直接按原逻辑解析
            //   （避免二进制内容中偶然出现 table 字样被下面分支误判为 HTML）
            if (full.charCodeAt(0) === 0x50 && full.charCodeAt(1) === 0x4B) {
                return XLSX.read(data, { type: isBase64 ? "base64" : "binary" });
            }
            if (full.charCodeAt(0) === 0xD0 && full.charCodeAt(1) === 0xCF && full.charCodeAt(2) === 0x11 && full.charCodeAt(3) === 0xE0) {
                return XLSX.read(data, { type: isBase64 ? "base64" : "binary" });
            }
            var low = full.toLowerCase();
            //A) SpreadsheetML 2003（office:spreadsheet 命名空间）
            if (low.indexOf("urn:schemas-microsoft-com:office:spreadsheet") >= 0) {
                return XLSX.read(full, { type: "string" });
            }
            //B) HTML 数据表：任意大小写 table 标签（WPS 另存可能为大写 TABLE）
            var ti = low.indexOf(L60 + "table");
            if (ti >= 0) {
                var closeTag = L60 + "/table" + G62;
                var te = low.lastIndexOf(closeTag);
                if (te > ti) {
                    var tbl = full.substring(ti, te + closeTag.length);
                    //标签名统一转小写，兼容大写标签（文本与属性不受影响）
                    tbl = tbl.replace(/<(\/?)([A-Za-z][A-Za-z0-9]*)/g, function (m, s, t) { return L60 + s + t.toLowerCase(); });
                    var wrap = L60 + "html" + G62 + L60 + "body" + G62 + tbl + L60 + "/body" + G62 + L60 + "/html" + G62;
                    return XLSX.read(wrap, { type: "string" });
                }
            }
            //C) 其他文本/未知格式，按原逻辑解析
            return XLSX.read(data, { type: isBase64 ? "base64" : "binary" });
        }
        
	
        //组件命令：
        this.导出excel = function (tableID,tableName,fileName){ //将表格内容导出为真正的XLS(BIFF8)文件
            //说明：原实现导出的是"HTML数据表"，WPS打开后另存会转成HTML框架集（表格数据拆到.files/sheet001.htm），
            //导致再次导入找不到table标签。改为用SheetJS生成真正的XLS(BIFF8)二进制，WPS打开/保存后仍是标准表格。
            var table = document.getElementById(tableID);
            if(!table){ if(event3!=null){ event3(false,"表格不存在"); } return; }
            var xlsData = "";
            try{
                var wb = XLSX.utils.table_to_book(table, {raw:true});
                //统一列结构：目标=导入后表头键数与页面表格当前数据列数一致（各页面新建模式判断的列数不同：
                //单分裂30/双分裂42/三分裂50/四分裂56/六分裂67/八分裂81/十分裂95）。
                //①表格首列checkbox单元格经htmldecode剥标签后为空串（z单元格），但SheetJS仍将其计入!ref（从A起）
                //  →读回时会多出__EMPTY/“选择”键，故先剔除A空列（!ref从B起）；
                //②目标列数以页面表格实际数据列数（表头th数-复选框列）为准，不再写死95，
                //  否则27-32等非95列页面导出时被强行补列，导入后列数校验不通过而报“格式有误”；
                //③剔除后列数仍不足目标列数（如删列场景）→A列补"选择"表头，保证列数判断命中且不影响数据列（页面下拉框用第2列）。
                try{
                    var ws0 = wb.Sheets[wb.SheetNames[0]];
                    var ref0 = ws0["!ref"] || "";
                    var m0 = ref0.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
                    if(m0){
                        var cStart = XLSX.utils.decode_col(m0[1]);
                        var cEnd = XLSX.utils.decode_col(m0[3]);
                        var a1 = ws0["A1"];
                        var a1Empty = !a1 || a1.v === undefined || a1.v === null || a1.v === "";
                        if(cStart === 0 && a1Empty){
                            //剔除A空列，避免读回时多出__EMPTY键
                            ws0["!ref"] = "B" + m0[2] + ":" + m0[3] + m0[4];
                            cStart = 1;
                        }
                        //目标列数=页面表格当前数据列数（表头行单元格数-复选框列）
                        var 目标列数 = 0;
                        if(table.rows && table.rows[0]){
                            目标列数 = table.rows[0].cells.length - 1;
                        }
                        var colNum = cEnd - cStart + 1;
                        if(colNum < 目标列数 && cStart === 1){
                            //列数不足目标列数：A列补"选择"表头（数据列不变，从B起）
                            XLSX.utils.sheet_add_aoa(ws0, [["选择"]], {origin:"A1"});
                        }
                    }
                }catch(e1){}
                xlsData = XLSX.write(wb, {bookType:"xls", type:"base64"});
            }catch(ex){
                if(event3!=null){ event3(false,"导出失败:"+ex.message); }
                return;
            }
            //base64解码为二进制字节（Blob二进制写入，避免文本写入破坏二进制）
            var bin = atob(xlsData);
            var len = bin.length;
            var bytes = new Uint8Array(len);
            for(var i=0;i<len;i++){ bytes[i]=bin.charCodeAt(i); }
            var blob = new Blob([bytes], {type:"application/vnd.ms-excel"});
            if(mui.os.plus){
                //App端：先删除旧文件再新建写入，避免seek覆盖残留旧数据导致文件损坏（WPS打开会容错修复，但直接导入会报错）
                try{
                    plus.io.resolveLocalFileSystemURL("_documents/", function( entry ) {
                        fileName=fileName+".xls";
                        entry.getFile(fileName,{create: true},function(fileEntry){
                            fileEntry.remove(function(){
                                entry.getFile(fileName,{create: true},function(entry2){
                                    entry2.createWriter( function ( writer ) {
                                        writer.write(blob);
                                        if(event3!=null){ event3(true,plus.io.convertLocalFileSystemURL("_documents/"+fileName)); }
                                    }, function ( e ) {
                                        if(event3!=null){ event3(false,e.message); }
                                    });
                                }, function ( e ) {
                                    if(event3!=null){ event3(false,e.message); }
                                });
                            }, function(e){
                                //旧文件不存在，直接新建写入
                                entry.getFile(fileName,{create: true},function(entry2){
                                    entry2.createWriter( function ( writer ) {
                                        writer.write(blob);
                                        if(event3!=null){ event3(true,plus.io.convertLocalFileSystemURL("_documents/"+fileName)); }
                                    }, function ( e ) {
                                        if(event3!=null){ event3(false,e.message); }
                                    });
                                }, function ( e ) {
                                    if(event3!=null){ event3(false,e.message); }
                                });
                            });
                        }, function ( e ) {
                            if(event3!=null){ event3(false,e.message); }
                        });
                    }, function (e) {
                        if(event3!=null){ event3(false,e.message); }
                    });
                }catch(ex){
                    if(event3!=null){ event3(false,"导出失败:"+ex.message); }
                }
            }else{
                //网页端：优先msSaveBlob（IE），否则blob URL+download下载（比data URI兼容更稳）
                try{
                    if (window.navigator && window.navigator.msSaveBlob) {
                        window.navigator.msSaveBlob(blob, fileName+".xls");
                    } else {
                        var url = URL.createObjectURL(blob);
                        var a = document.createElement("a");
                        a.href = url;
                        a.download = fileName+".xls";
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(function(){
                            if (a.parentNode) a.parentNode.removeChild(a);
                            URL.revokeObjectURL(url);
                        }, 300);
                    }
                }catch(ex){
                    if(event3!=null){ event3(false,"导出失败:"+ex.message); }
                }
            }
        }
    // 添加表头（强制为第0行）
    this.添加表头 = function(color, items) {
        var table = document.getElementById(this.名称);
        table.innerHTML = ''; // 清空原有内容（若有）
        var cells = `<th><input type='checkbox' id='${this.名称}-header-checkbox'></th>`;
        for (let i = 0; i < items.length; i++) {
            cells += `<th id='${this.名称}-0-${i + 2}'>${items[i]}</th>`; // 用户列索引从2开始
        }
        var rowStyle = color ? ` style="background:${color}"` : '';
        table.innerHTML += `<tr id='${this.名称}-0'${rowStyle}>${cells}</tr>`;
    };

    // 添加表项（从第1行开始）
    this.添加表项 = function(color, items) {
        var table = document.getElementById(this.名称);
        var rowCount = table.getElementsByTagName('tr').length; // 表头为0，表项从1开始
        let cells = `<td><input type='checkbox' class='${this.名称}-data-checkbox' id='${this.名称}-checkbox-${rowCount}'></td>`;
        for (let i = 0; i < items.length; i++) {
            cells += `<td id='${this.名称}-${rowCount}-${i + 2}'>${items[i]}</td>`; // 用户列索引从2开始
        }
        var rowStyle = color ? ` style="background:${color}"` : '';
        table.innerHTML += `<tr id='${this.名称}-${rowCount}'${rowStyle}>${cells}</tr>`;
    };

    // 私有方法：更新行样式
    this._updateRowStyle = function(rowIndex) {
        var checkbox = document.getElementById(`${this.名称}-checkbox-${rowIndex}`);
        var row = document.getElementById(`${this.名称}-${rowIndex}`);
        if (checkbox && row) {
            // 仅当复选框启用时才更新选中样式
            if (!checkbox.disabled) {
                row.classList.toggle(SELECTED_ROW_CLASS, checkbox.checked);
            }
        }
    };

    // 组件命令：删除表项
    this.删除表项 = function(rowIndex) {
    // 处理特殊情况：如果rowIndex为null或undefined，清空所有表项（保留表头）
    if (rowIndex === null || rowIndex === undefined) {
        var table = document.getElementById(this.名称);
        if (!table) return;
        
        // 保留表头，删除所有数据行
        while (table.rows.length > 1) {
            table.deleteRow(1); // 始终删除第1行（表头是第0行）
        }
        
        this._updateRowIndexes();
        this._updateHeaderCheckboxState();
        return;
    }
    
    var tr = document.getElementById(`${this.名称}-${rowIndex}`);
    if (tr) {
        tr.parentNode.removeChild(tr);
        this._updateRowIndexes();
        this._updateHeaderCheckboxState();
    }
    };    
        
    // 组件命令：清空表项
    this.清空表项 = function() {
        var table = document.getElementById(this.名称);
        while(table.hasChildNodes()){
            table.removeChild(table.firstChild);
        }
    };

    // 组件命令：设置字体大小
    this.置字体大小 = function(大小) {
        document.getElementById(this.名称).style.fontSize = 大小;
    };
	
    // 组件命令：设置边框颜色
    this.置边框颜色 = function(颜色) {
        document.getElementById(this.名称).style.borderColor = 颜色;
    };

    // 组件命令：设置表项背景色
    this.置表项背景色 = function(行索引, 颜色) {
        var id = this.名称 + "-" + 行索引;
        document.getElementById(id).style.background = 颜色;
    };

    // 组件命令：设置单元格背景色
    this.置单元格背景色 = function(行索引, 列索引, 颜色) {
        if (列索引 < 1) return;
        var id = this.名称 + "-" + 行索引 + "-" + 列索引;
        var cell = document.getElementById(id);
        if (cell) {
            cell.style.background = 颜色;
        } else {
            console.error(`无法设置背景色`);
        }
    };

    // 组件命令：设置单元格文字色
    this.置单元格文字色 = function(行索引, 列索引, 颜色) {
        if (列索引 < 1) return;
        var id = this.名称 + "-" + 行索引 + "-" + 列索引;
        document.getElementById(id).style.color = 颜色;
    };

    // 组件命令：设置表项标记
    this.置表项标记 = function(行索引, 标记) {
        var id = this.名称 + "-" + 行索引;
        document.getElementById(id).setAttribute("tag", 标记);
    };

    // 组件命令：获取表项标记
    this.取表项标记 = function(行索引) {
        var id = this.名称 + "-" + 行索引;
        return document.getElementById(id).getAttribute("tag");
    };
    
    // 组件命令：设置单元格内容
    this.置单元格内容 = function(行索引, 列索引, 内容) {
        if (列索引 < 1) return;
        const id = `${this.名称}-${行索引}-${列索引}`;
        const cell = document.getElementById(id);
        if (!cell) {
            console.error(`单元格不存在`);
            return;
        }
        if (cell.classList.contains(EDITABLE_CELL_CLASS)) {
            this._finishEditing(cell);
        }
        cell.innerHTML = 内容;
    };
    
    // 组件命令：获取单元格内容
    this.取单元格内容 = function(行索引, 列索引) {
        if (列索引 < 1) return "";
        var id = this.名称 + "-" + 行索引 + "-" + 列索引;
        let title = document.getElementById(id)?.innerHTML || "";
        return title.replace(/(^\n*)|(\n*$)/g, "").trim();
    }
    
    // 组件命令：获取表格行列数
    this.取行列数 = function() {
        var table = document.getElementById(this.名称);
        if (!table) return { 行数: 0, 列数: 0 };
        var rows = table.getElementsByTagName('tr');
        var dataRows = rows.length - 1;
        var headerRow = rows[0];
        var headerCells = headerRow.getElementsByTagName('th');
        var colCount = headerCells.length - 1;
        colCount = Math.max(colCount, 0);
        return {
           行数: dataRows >= 0 ? dataRows : 0,
           列数: colCount
        };
    };
    
    // 组件命令：设置可视性（不占位）
    this.置可视 = function(value) {
        var div = document.getElementById(this.名称);
        div.style.display = value ? "" : "none";
    }; 
    
    // 全选/取消全选方法（含禁用状态检查）
    this.全选 = function(checked) {
        var headerCheckbox = document.getElementById(`${this.名称}-header-checkbox`);
        var dataCheckboxes = document.querySelectorAll(`.${this.名称}-data-checkbox`);
        
        // 检查表头复选框是否可用
        if (headerCheckbox.disabled) return;
        
        headerCheckbox.checked = checked;
        headerCheckbox.indeterminate = false;
        dataCheckboxes.forEach(checkbox => {
            // 只操作可用的复选框
            if (!checkbox.disabled) {
                checkbox.checked = checked;
                var row = checkbox.closest('tr');
                if (row) row.classList.toggle(SELECTED_ROW_CLASS, checked);
            }
        });
    };
    
    // 私有方法：更新所有行和单元格的索引
    this._updateRowIndexes = function() {
        var trs = document.getElementById(this.名称).getElementsByTagName("tr");
        for (let i = 0; i < trs.length; i++) {
            trs[i].id = `${this.名称}-${i}`;
            var checkbox = trs[i].querySelector("input[type='checkbox']");
            if (checkbox) {
                checkbox.id = i === 0 
                    ? `${this.名称}-header-checkbox` 
                    : `${this.名称}-checkbox-${i}`;
            } 
            var cells = trs[i].getElementsByTagName(i === 0 ? 'th' : 'td');
            for (let j = 0; j < cells.length; j++) {
                cells[j].id = `${this.名称}-${i}-${j + 1}`;
            }
        }
        this._updateHeaderCheckboxState();
    };
    
    // 更新表头全选框状态（考虑禁用的复选框）
    this._updateHeaderCheckboxState = function() {
        var headerCheckbox = document.getElementById(`${this.名称}-header-checkbox`);
        var dataCheckboxes = document.querySelectorAll(`.${this.名称}-data-checkbox`); 
        if (headerCheckbox && dataCheckboxes.length > 0) {
            // 计算可用复选框中选中的数量
            var checkedCount = Array.from(dataCheckboxes).filter(cb => !cb.disabled && cb.checked).length;
            var availableCheckboxes = dataCheckboxes.length - 
                Array.from(dataCheckboxes).filter(cb => cb.disabled).length;
            
            if (availableCheckboxes === 0) {
                headerCheckbox.checked = false;
                headerCheckbox.indeterminate = false;
                return;
            }
            
            headerCheckbox.checked = checkedCount === availableCheckboxes;
            headerCheckbox.indeterminate = checkedCount > 0 && checkedCount < availableCheckboxes;
        }
    };
        
    // 组件命令：获取选中行索引（排除禁用的复选框）
    this.获取选中行 = function() {
        var selectedRows = [];
        var trs = document.getElementById(this.名称).getElementsByTagName("tr");
        for (let i = 1; i < trs.length; i++) {
            var checkbox = trs[i].querySelector('input[type="checkbox"]');
            if (checkbox?.checked && !checkbox.disabled) {
                selectedRows.push(i);
            }
        }
        return selectedRows;
    };
        
	// 组件命令：获取表项总数（不包括表头）
    this.取表项总数 = function() {
    var table = document.getElementById(this.名称);
    if (!table) return 0;
    var rows = table.getElementsByTagName('tr');
    // 表头为第0行，表项从第1行开始计数
    return rows.length - 1;
    };
	
    // 选中行删除功能
    this.删除选中行 = function() {
        var selectedRows = this.获取选中行().sort((a, b) => b - a);
        if (selectedRows.length === 0) return;
        selectedRows.forEach(rowIndex => this.删除表项(rowIndex));
        this._updateHeaderCheckboxState();
    };

    // 获取行内容（跳过复选框列）
    this.取行内容 = function(rowIndex) {
        var row = document.getElementById(`${this.名称}-${rowIndex}`);
        if (!row) return [];
        var cells = row.querySelectorAll('th, td');
        return Array.from(cells).slice(1).map(cell => cell.textContent.trim());
    };

    // 组件命令：添加列
    this.添加列 = function(headerText, cellValues, headerColor, cellColor) {
        var table = document.getElementById(this.名称);
        var rows = table.getElementsByTagName('tr');
        if (rows.length === 0) return;
        var userColumnIndex = (rows[0].getElementsByTagName('th').length - 1) + 2;
        var columnIndex = userColumnIndex;
        var headerCell = document.createElement('th');
        headerCell.id = `${this.名称}-0-${columnIndex}`;
        headerCell.textContent = headerText;
        if (headerColor) headerCell.style.backgroundColor = headerColor;
        rows[0].appendChild(headerCell);
        for (var i = 1; i < rows.length; i++) {
            var cell = document.createElement('td');
            cell.id = `${this.名称}-${i}-${columnIndex}`;
            cell.textContent = cellValues && cellValues[i-1] !== undefined ? cellValues[i-1] : '';
            if (cellColor) cell.style.backgroundColor = cellColor;
            rows[i].appendChild(cell);
        }
        this._updateRowIndexes();
    };


    // 删除列方法
    this.删除列 = function(userColumnIndex) {
        if (userColumnIndex < 2) {
            console.error("错误：不能删除复选框列（索引需≥2）");
            return;
        }
        var table = document.getElementById(this.名称);
        var rows = table.getElementsByTagName('tr');
        if (!rows.length) return;
        var actualColumnIndex = userColumnIndex - 1;
        if (actualColumnIndex < 1 || actualColumnIndex >= rows[0].cells.length) {
            console.error(`错误：无效列索引 ${userColumnIndex}`);
            return;
        }
        for (var i = rows.length - 1; i >= 0; i--) {
            var row = rows[i];
            var cell = row.cells[actualColumnIndex];
            if (cell) row.removeChild(cell);
        }
        this._updateRowIndexes();
        this._updateHeaderCheckboxState();
    };

    // 定义更新列索引的方法
    this._updateColumnIndexes = function() {
        // 已在 _updateRowIndexes 中处理
    };


   // 私有方法：使单元格进入编辑状态
   this._startEditing = function(cell) {
        var [, rowIndex, colIndex] = cell.id.split('-').map(Number);
        if (colIndex === 1) return;
        
        // 检查行是否被禁用
        var row = cell.closest('tr');
        if (row.classList.contains(DISABLED_ROW_CLASS)) return;
        
        var table = document.getElementById(this.名称);
        var totalColumns = table.rows[0].cells.length;
        var originalContent = cell.innerText;
        cell.setAttribute('data-original-content', originalContent);
        cell.classList.add(EDITABLE_CELL_CLASS);
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalContent;
        input.style.width = '100%';
        cell.innerHTML = '';
        cell.appendChild(input);
        input.focus();
        
        input.addEventListener('blur', () => this._finishEditing(cell));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this._finishEditing(cell);
            if (e.key === 'Escape') this._cancelEditing(cell);
        });
    };
    
    // 私有方法：完成单元格编辑
    this._finishEditing = function(cell) {
        var input = cell.querySelector('input');
        if (!input) return;
        var newValue = input.value;
        var originalContent = cell.getAttribute('data-original-content');
        var [, rowIndex, colIndex] = cell.id.split('-').map(Number);
        cell.textContent = newValue;
        cell.classList.remove(EDITABLE_CELL_CLASS);
        cell.removeAttribute('data-original-content');
        if (newValue !== originalContent) {
            var isHeader = rowIndex === 0;
            event(rowIndex, colIndex, newValue, 'edit', isHeader);
        }
    };
    
    // 私有方法：取消单元格编辑
    this._cancelEditing = function(cell) {
        var originalContent = cell.getAttribute('data-original-content');
        if (originalContent !== null) {
            cell.innerHTML = originalContent;
            cell.classList.remove(EDITABLE_CELL_CLASS);
            cell.removeAttribute('data-original-content');
        }
    };

    // 新增私有方法：完成所有编辑
    this._finishAllEditing = function() {
        document.querySelectorAll('.table-cell-editing').forEach(cell => {
            this._finishEditing(cell);
        });
    };

    // 组件命令：获取未选中行索引
    this.获取未选中行 = function() {
        var allRows = this.获取所有数据行索引();
        var selectedRows = this.获取选中行();
        return allRows.filter(row => !selectedRows.includes(row));
    };

    // 私有方法：获取所有数据行索引
    this.获取所有数据行索引 = function() {
        var rows = document.getElementById(this.名称).getElementsByTagName("tr");
        return Array.from(rows).slice(1).map(row => parseInt(row.id.split('-')[1]));
    };

    // 启用复选框方法
    this.启用复选框 = function(rowIndex, enable = true) {
        // 处理单个行索引
        if (typeof rowIndex === 'number') {
            this._setRowCheckboxStatus(rowIndex, enable);
            return;
        }
        
        // 处理行索引数组
        if (Array.isArray(rowIndex)) {
            rowIndex.forEach(index => this._setRowCheckboxStatus(index, enable));
            return;
        }
        
        // 处理所有行
        this._setAllCheckboxesStatus(enable);
    };
    
    // 禁用复选框快捷方法
    this.禁用复选框 = function(rowIndex) {
        this.启用复选框(rowIndex, false);
    };
    
    // 私有方法：设置单行复选框状态
    this._setRowCheckboxStatus = function(rowIndex, enable) {
        if (rowIndex < 0) return;
        
        const checkbox = document.getElementById(`${this.名称}-checkbox-${rowIndex}`);
        if (!checkbox) return;
        
        // 设置禁用状态
        checkbox.disabled = !enable;
        
        // 更新行样式
        const row = document.getElementById(`${this.名称}-${rowIndex}`);
        if (row) {
            if (enable) {
                row.classList.remove(DISABLED_ROW_CLASS);
                // 移除禁用时的选中状态
                if (checkbox.checked) {
                    row.classList.add(SELECTED_ROW_CLASS);
                }
            } else {
                row.classList.add(DISABLED_ROW_CLASS);
                // 禁用时取消选中状态
                if (checkbox.checked) {
                    checkbox.checked = false;
                    row.classList.remove(SELECTED_ROW_CLASS);
                }
            }
        }
        
        // 更新表头状态
        this._updateHeaderCheckboxState();
    };
    
    // 私有方法：设置所有复选框状态
    this._setAllCheckboxesStatus = function(enable) {
        const dataCheckboxes = document.querySelectorAll(`.${this.名称}-data-checkbox`);
        dataCheckboxes.forEach(checkbox => {
            checkbox.disabled = !enable;
            
            const row = checkbox.closest('tr');
            if (row) {
                if (enable) {
                    row.classList.remove(DISABLED_ROW_CLASS);
                    if (checkbox.checked) {
                        row.classList.add(SELECTED_ROW_CLASS);
                    }
                } else {
                    row.classList.add(DISABLED_ROW_CLASS);
                    if (checkbox.checked) {
                        checkbox.checked = false;
                        row.classList.remove(SELECTED_ROW_CLASS);
                    }
                }
            }
        });
        
        // 更新表头复选框
        const headerCheckbox = document.getElementById(`${this.名称}-header-checkbox`);
        if (headerCheckbox) {
            headerCheckbox.disabled = !enable;
            this._updateHeaderCheckboxState();
        }
    };

    // 组件事件
    if (event != null) {
        // 表头复选框全选事件
        mui("#" + this.名称).on("change", "th:first-child input[type='checkbox']", function() {
            self.全选(this.checked);
        });
        
        // 表项复选框状态变化事件
        mui("#" + this.名称).on("change", "td:first-child input[type='checkbox']", function() {
            var rowIndex = parseInt(this.closest('tr').id.split('-')[1]);
            self._updateRowStyle(rowIndex);
            self._updateHeaderCheckboxState();
            if (typeof event === 'function') {
                event(SELECTED_ROWS_CHANGE, self.获取选中行());
                event(UNSELECTED_ROWS_CHANGE, self.获取未选中行());
            }
        });
    
        // 全局点击事件
        mui("#" + this.名称).on("tap", "th, td", function(e) {
            if (this.parentNode.firstChild === this) return; // 跳过复选框列
            
            // 检查行是否被禁用
            var row = this.closest('tr');
            if (row.classList.contains(DISABLED_ROW_CLASS)) return;
            
            if (lastClickedCell) {
                lastClickedCell.classList.remove('cell-clicked');
            }
            if (!this.classList.contains(EDITABLE_CELL_CLASS)) {
                this.classList.add('cell-clicked');
                lastClickedCell = this;
                var [, rowIndex, colIndex] = this.id.split('-').map(Number);
                event(rowIndex, colIndex, this.textContent.trim(), 'click');
            }
        });

        // 表头单元格编辑事件
        mui("#" + this.名称).on("doubletap", "th:not(:first-child)", function() {
            if (this.firstChild?.tagName === 'INPUT' || this.classList.contains(EDITABLE_CELL_CLASS)) return;
            
            // 检查行是否被禁用（表头行一般不会被禁用，但添加检查以防万一）
            var row = this.closest('tr');
            if (row.classList.contains(DISABLED_ROW_CLASS)) return;
            
            self._startEditing(this);
        });
        
        // 表头单元格双击删除列
        mui("#" + this.名称).on("doubletap", "th:not(:first-child)", function() {
            var [, row, col] = this.id.split('-').map(Number);
            if (col >= 2) self.删除列(col);
        });
        
        // 数据单元格编辑事件
        mui("#" + this.名称).on("tap", "td:not(:first-child)", function() {
            if (this.parentNode.firstChild === this || this.classList.contains(EDITABLE_CELL_CLASS)) return;
            
            // 检查行是否被禁用
            var row = this.closest('tr');
            if (row.classList.contains(DISABLED_ROW_CLASS)) return;
            
            self._startEditing(this); 
            var [, rowIndex, colIndex] = this.id.split('-').map(Number);
            event(rowIndex, colIndex, this.textContent.trim(), 'click');
        });
    }
	
	if (event2 != null) {
	
	}
	
	if (event3 != null) {
	
	}
	
}