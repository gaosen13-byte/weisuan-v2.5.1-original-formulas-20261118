function indexedDB数据库(name, event1, event2, event3, event4, event5) {
    this.db = null;
    this.dbName = name || "defaultDB";
    this.dbVersion = 1;
    this.tablesCreated = new Set();
    this.pendingCreate = { table: null, column: null };

    // 保存前端传入的5个回调（对应5个完毕事件）
    this.callbacks = {
        createTable: event1,    // event1 → 创建数据表完毕
        addData: event2,        // event2 → 添加数据完毕
        deleteData: event3,     // event3 → 删除数据完毕
        updateData: event4,     // event4 → 修改数据完毕
        queryData: event5       // event5 → 查询数据完毕
    };


    // 辅助函数：忽略引号分割字符串（保持不变）
    this.splitIgnoreQuotes = function(str, separator) {
    // 处理空输入：直接返回空数组
    if (typeof str !== 'string' || str.trim() === '') {
        return [];
    }
    
    const result = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = null;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === "'" || char === '"') {
            if (!inQuotes) {
                inQuotes = true;
                quoteChar = char;
                current += char;
            } else if (char === quoteChar) {
                if (i + 1 < str.length && str[i + 1] === char) {
                    current += char + char;
                    i++;
                } else {
                    inQuotes = false;
                    quoteChar = null;
                    current += char;
                }
            } else {
                current += char;
            }
        } else if (char === separator && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    if (current) result.push(current.trim());
    return result; // 确保始终返回数组
    };


    // 1. 创建数据表 - 触发 event1（创建数据表完毕）
    this.创建数据表 = function(table, column) {
        return new Promise((resolve) => {
            if (!this.tablesCreated) {
                this.tablesCreated = new Set();
                console.warn("tablesCreated未初始化，已自动创建");
            }
            
            if (this.tablesCreated.has(table)) {
                console.log("表已存在:", table);
                // 触发创建数据表完毕回调（成功）
                this.triggerCallback('createTable', true, "");
                resolve({ success: true });
                return;
            }
            
            if (!this.db) {
                this.pendingCreate = { table, column };
                console.log("待创建表：" + table);
                this.打开数据库().then((result) => {
                    if (result.success) {
                        this.triggerCallback('createTable', true, "");
                    } else {
                        this.triggerCallback('createTable', false, result.error);
                    }
                    resolve(result);
                });
                return;
            }
            
            if (this.db.objectStoreNames.contains(table)) {
                this.tablesCreated.add(table);
                this.triggerCallback('createTable', true, "");
                resolve({ success: true });
            } else {
                const error = "非首次打开，无法创建表（请清除浏览器数据后重试）";
                console.error(error);
                this.triggerCallback('createTable', false, error);
                resolve({ success: false, error });
            }
        });
    };


    // 2. 添加数据 - 触发 event2（添加数据完毕）
    this.添加数据 = function(table, data) {
        return new Promise((resolve) => {
            console.log("准备添加数据:", data);
            
            if (!this.db) {
                const error = "数据库未打开";
                console.error(error);
                this.triggerCallback('addData', false, error);
                resolve({ success: false, error });
                return;
            }
            
            if (!this.db.objectStoreNames.contains(table)) {
                const error = "表" + table + "不存在";
                console.error(error);
                this.triggerCallback('addData', false, error);
                resolve({ success: false, error });
                return;
            }
            
            const transaction = this.db.transaction([table], 'readwrite');
            
            transaction.onerror = (event) => {
                const error = "事务失败：" + event.target.error.message;
                console.error(error);
                this.triggerCallback('addData', false, error);
                resolve({ success: false, error });
            };
            
            const objectStore = transaction.objectStore(table);
            const request = objectStore.add(data);
            
            request.onsuccess = () => {
                console.log("数据添加成功，自动生成id：" + request.result);
                const addedData = { ...data, id: request.result };
                this.triggerCallback('addData', true, addedData); // 成功时传递添加后的数据
                resolve({ success: true, data: addedData });
            };
            
            request.onerror = (event) => {
                const error = "添加失败：" + event.target.error.message;
                console.error(error);
                this.triggerCallback('addData', false, error);
                resolve({ success: false, error });
            };
        });
    };


    // 3. 删除数据 - 触发 event3（删除数据完毕）
    this.删除数据 = function(table, condition) {
    return new Promise((resolve) => {
        if (!this.db || !this.db.objectStoreNames.contains(table)) {
            const error = "数据库未打开或表不存在";
            console.error(error);
            this.triggerCallback('deleteData', false, error);
            resolve({ success: false, error });
            return;
        }
        
        const transaction = this.db.transaction([table], 'readwrite');
        
        transaction.onerror = (event) => {
            const error = "事务失败：" + event.target.error.message;
            console.error(error);
            this.triggerCallback('deleteData', false, error);
            resolve({ success: false, error });
        };
        
        const objectStore = transaction.objectStore(table);
        
        try {
            // 新增：判断是否为删除全部记录
            if (!condition) {
                const request = objectStore.clear();
                request.onsuccess = () => {
                    console.log("表数据全部删除成功");
                    this.triggerCallback('deleteData', true);
                    resolve({ success: true });
                };
                request.onerror = (event) => {
                    const error = "删除全部数据失败：" + event.target.error.message;
                    console.error(error);
                    this.triggerCallback('deleteData', false, error);
                    resolve({ success: false, error });
                };
                return;
            }
            
            // 原有的单条记录删除逻辑
            const [key, value] = condition.split('=').map(v => v.trim());
            const cleanValue = isNaN(Number(value)) ? value.replace(/'/g, '') : Number(value);
            
            if (key === 'id') {
                const request = objectStore.delete(cleanValue);
                request.onsuccess = () => {
                    console.log("删除成功");
                    this.triggerCallback('deleteData', true);
                    resolve({ success: true });
                };
                request.onerror = (event) => {
                    const error = "删除失败：" + event.target.error.message;
                    console.error(error);
                    this.triggerCallback('deleteData', false, error);
                    resolve({ success: false, error });
                };
            } else {
                const index = objectStore.index(key);
                const request = index.openKeyCursor(IDBKeyRange.only(cleanValue));
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        objectStore.delete(cursor.primaryKey);
                        cursor.continue();
                    } else {
                        console.log("删除成功");
                        this.triggerCallback('deleteData', true);
                        resolve({ success: true });
                    }
                };
                request.onerror = (event) => {
                    const error = "查询索引失败：" + event.target.error.message;
                    console.error(error);
                    this.triggerCallback('deleteData', false, error);
                    resolve({ success: false, error });
                };
            }
        } catch (error) {
            const errMsg = "删除操作出错：" + error.message;
            console.error(errMsg);
            this.triggerCallback('deleteData', false, errMsg);
            resolve({ success: false, error: errMsg });
        }
    });
    };


    // 4. 修改数据 - 触发 event4（修改数据完毕）
    this.修改数据 = function(table, dataStr, condition) {
    return new Promise((resolve) => {
        if (!this.db || !this.db.objectStoreNames.contains(table)) {
            const error = "数据库未打开或表不存在";
            console.error(error);
            this.triggerCallback('updateData', false, error);
            resolve({ success: false, error });
            return;
        }

        // 新增：校验 dataStr 有效性
        if (typeof dataStr !== 'string' || dataStr.trim() === '') {
            const error = "修改的数据格式无效（不能为空或非字符串）";
            console.error(error);
            this.triggerCallback('updateData', false, error);
            resolve({ success: false, error });
            return;
        }

        // 确保 dataPairs 是数组（即使 splitIgnoreQuotes 返回异常）
        const dataPairs = this.splitIgnoreQuotes(dataStr, ',') || [];
        const updateData = {};
        let isInvalid = false;
        let errorMsg = '';
        
        // 新增：检查 dataPairs 是否为空（无有效键值对）
        if (dataPairs.length === 0) {
            errorMsg = "未找到有效的修改字段（格式应为 'key=value,key2=value2'）";
            console.error(errorMsg);
            isInvalid = true;
        } else {
            dataPairs.forEach(pair => {
                if (isInvalid) return; // 已发现错误则跳过
                
                if (!pair.includes('=')) {
                    errorMsg = "无效的数据格式：" + pair + "（缺少 '='）";
                    console.error(errorMsg);
                    isInvalid = true;
                    return;
                }
                
                // 修复：仅分割第一个'='，避免值中的'='被错误分割
                const equalsIndex = pair.indexOf('=');
                const keyPart = pair.substring(0, equalsIndex).trim();
                const valuePart = pair.substring(equalsIndex + 1).trim();
                
                if (!keyPart) {
                    errorMsg = "无效的键值对：" + pair + "（键名不能为空）";
                    console.error(errorMsg);
                    isInvalid = true;
                    return;
                }
                
                const cleanKey = keyPart.replace(/'/g, '');
                let cleanValue = valuePart.replace(/^'/g, '').replace(/'$/g, '');
                if (!isNaN(Number(cleanValue))) cleanValue = Number(cleanValue);
                updateData[cleanKey] = cleanValue;
            });
        }

        if (isInvalid) {
            this.triggerCallback('updateData', false, errorMsg);
            resolve({ success: false, error: errorMsg });
            return;
        }
        
        // 解析查询条件
        let cleanCondKey, cleanCondValue;
        try {
            const conditionParts = this.splitIgnoreQuotes(condition, '=');
            if (conditionParts.length < 2) throw new Error("条件格式错误：" + condition);
            cleanCondKey = conditionParts[0].trim().replace(/'/g, '');
            cleanCondValue = conditionParts[1].trim().replace(/^'/g, '').replace(/'$/g, '');
            if (!isNaN(Number(cleanCondValue))) cleanCondValue = Number(cleanCondValue);
        } catch (err) {
            const error = "解析条件失败：" + err.message;
            console.error(error);
            this.triggerCallback('updateData', false, error);
            resolve({ success: false, error });
            return;
        }

        const transaction = this.db.transaction([table], 'readwrite');
        
        transaction.onerror = (event) => {
            const error = "事务失败：" + event.target.error.message;
            console.error(error);
            this.triggerCallback('updateData', false, error);
            resolve({ success: false, error });
        };
        
        const objectStore = transaction.objectStore(table);
        const request = objectStore.openCursor();
        let updateSuccess = false;
        let updatedData = null;
        
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                if (cursor.value[cleanCondKey] === cleanCondValue) {
                    updatedData = { ...cursor.value, ...updateData };
                    const updateRequest = cursor.update(updatedData);
                    
                    updateRequest.onsuccess = () => {
                        console.log("修改成功，更新后的数据：", updatedData);
                        updateSuccess = true;
                    };
                    
                    updateRequest.onerror = (e) => {
                        const error = "修改失败：" + e.target.error.message;
                        console.error(error);
                        this.triggerCallback('updateData', false, error);
                        resolve({ success: false, error });
                    };
                }
                cursor.continue();
            } else {
                if (updateSuccess) {
                    this.triggerCallback('updateData', true, updatedData); // 传递修改后的数据
                    resolve({ success: true, data: updatedData });
                } else {
                    const error = "未找到匹配数据";
                    console.log(error);
                    this.triggerCallback('updateData', false, error);
                    resolve({ success: false, error });
                }
            }
        };
        
        request.onerror = (e) => {
            const error = "查询游标失败：" + e.target.error.message;
            console.error(error);
            this.triggerCallback('updateData', false, error);
            resolve({ success: false, error });
        };
    });
    };


    // 5. 查询数据 - 触发 event5（查询数据完毕）
    this.查询数据 = function(table, condition) {
        return new Promise((resolve) => {
            if (!this.db || !this.db.objectStoreNames.contains(table)) {
                const error = "数据库未打开或表不存在";
                console.error(error);
                this.triggerCallback('queryData', false, 0, null, error);
                resolve({ success: false, error, data: null, length: 0 });
                return;
            }
            
            const result = [];
            const transaction = this.db.transaction([table], 'readonly');
            
            transaction.onerror = (event) => {
                const error = "事务失败：" + event.target.error.message;
                console.error(error);
                this.triggerCallback('queryData', false, 0, null, error);
                resolve({ success: false, error, data: null, length: 0 });
            };
            
            const objectStore = transaction.objectStore(table);
            
            // 全量查询
            if (!condition) {
                const request = objectStore.openCursor();
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        result.push(cursor.value);
                        cursor.continue();
                    } else {
                        console.log("全量查询成功，共" + result.length + "条数据");
                        this.triggerCallback('queryData', true, result.length, result); // 传递结果、数量、数据
                        resolve({
                            success: true,
                            data: result,
                            length: result.length
                        });
                    }
                };
                request.onerror = (event) => {
                    const error = "查询失败：" + event.target.error.message;
                    console.error(error);
                    this.triggerCallback('queryData', false, 0, null, error);
                    resolve({ success: false, error, data: null, length: 0 });
                };
                return;
            }
            
            // 条件查询
            const [key, value] = condition.split('=').map(v => v.trim());
            const cleanKey = key.replace(/'/g, '');
            let cleanValue = value.replace(/^'|'$/g, '');
            if (!isNaN(Number(cleanValue))) cleanValue = Number(cleanValue);
            
            try {
                if (cleanKey === 'id') {
                    const request = objectStore.get(cleanValue);
                    request.onsuccess = (event) => {
                        const data = event.target.result;
                        const resultList = data ? [data] : [];
                        console.log("主键查询成功，共" + resultList.length + "条数据");
                        this.triggerCallback('queryData', true, resultList.length, resultList);
                        resolve({
                            success: true,
                            data: resultList,
                            length: resultList.length
                        });
                    };
                    request.onerror = (event) => {
                        const error = "查询失败：" + event.target.error.message;
                        console.error(error);
                        this.triggerCallback('queryData', false, 0, null, error);
                        resolve({ success: false, error, data: null, length: 0 });
                    };
                } else {
                    const index = objectStore.index(cleanKey);
                    const request = index.openCursor(IDBKeyRange.only(cleanValue));
                    request.onsuccess = (event) => {
                        const cursor = event.target.result;
                        if (cursor) {
                            result.push(cursor.value);
                            cursor.continue();
                        } else {
                            console.log("索引查询成功，共" + result.length + "条数据");
                            this.triggerCallback('queryData', true, result.length, result);
                            resolve({
                                success: true,
                                data: result,
                                length: result.length
                            });
                        }
                    };
                    request.onerror = (event) => {
                        const error = "查询索引失败：" + event.target.error.message;
                        console.error(error);
                        this.triggerCallback('queryData', false, 0, null, error);
                        resolve({ success: false, error, data: null, length: 0 });
                    };
                }
            } catch (error) {
                const errMsg = "查询操作出错：" + error.message;
                console.error(errMsg);
                this.triggerCallback('queryData', false, 0, null, errMsg);
                resolve({ success: false, error: errMsg, data: null, length: 0 });
            }
        });
    };


    // 打开数据库（保持不变，仅调整创建表时的回调触发）
    this.打开数据库 = function() {
        return new Promise((resolve) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = (event) => {
                const error = "打开数据库失败: " + event.target.error.message;
                console.error(error);
                if (this.pendingCreate.table) {
                    this.pendingCreate = { table: null, column: null };
                }
                resolve({ success: false, error });
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log("数据库打开成功（版本：" + this.dbVersion + "）");
                
                if (this.pendingCreate.table) {
                    const { table } = this.pendingCreate;
                    this.pendingCreate = { table: null, column: null };
                    if (this.db.objectStoreNames.contains(table)) {
                        this.tablesCreated.add(table);
                        resolve({ success: true });
                    } else {
                        const error = "首次打开但表未创建成功";
                        console.error(error);
                        resolve({ success: false, error });
                    }
                } else {
                    resolve({ success: true });
                }
            };
            
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                console.log("初始化/升级数据库（版本：" + this.dbVersion + "）");
                
                if (this.pendingCreate.table && this.pendingCreate.column) {
                    const { table, column } = this.pendingCreate;
                    console.log("开始创建表：" + table);
                    
                    const columns = column.split(',').map(col => col.trim());
                    const keyPath = columns.find(col => col.includes('primary key'))?.split(' ')[0] || 'id';
                    const autoIncrement = true;
                    
                    if (!this.db.objectStoreNames.contains(table)) {
                        const objectStore = this.db.createObjectStore(table, { 
                            keyPath,
                            autoIncrement: autoIncrement
                        });
                        
                        columns.forEach(col => {
                            const parts = col.split(' ');
                            const colName = parts[0];
                            if (colName !== keyPath && !col.includes('primary key')) {
                                objectStore.createIndex(colName, colName, { unique: false });
                            }
                        });
                        console.log("表创建成功（支持自增）：" + table);
                    } else {
                        console.log("表已存在：" + table);
                    }
                }
            };
        });
    };


    // 统一触发回调的工具方法
    this.triggerCallback = function(type, ...args) {
        const callback = this.callbacks[type];
        if (typeof callback === 'function') {
            console.log(`触发${type}回调：`, ...args);
            callback(...args); // 传递所有参数给前端事件
        }
    };
}