"""Apply the audited normal-calculation gate patch to an unpacked classes.dex."""
import hashlib
import struct
import sys
import zlib

path = sys.argv[1]
data = bytearray(open(path, "rb").read())
offset = 0x122510
expected = bytes.fromhex("6e203a1476000a06")
if data[offset:offset + 8] != expected:
    raise SystemExit("Unexpected instruction sequence; APK version does not match the audited v2.5.1 build.")
# const/4 v6, #1; nop; nop; nop
# Replaces only the JifengManager.isActive() call made during calculator input.
data[offset:offset + 8] = bytes.fromhex("1216000000000000")
data[12:32] = hashlib.sha1(data[32:]).digest()
data[8:12] = struct.pack("<I", zlib.adler32(data[12:]) & 0xffffffff)
open(path, "wb").write(data)
print("Patched normal-calculation fee gate and regenerated DEX integrity fields.")
