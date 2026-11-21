"""Verify DEX integrity and the audited calculation-gate patch."""
import hashlib
import struct
import sys
import zlib

data = open(sys.argv[1], "rb").read()
assert data[:8] == b"dex\n035\0", "Unexpected DEX format"
assert data[12:32] == hashlib.sha1(data[32:]).digest(), "DEX SHA-1 mismatch"
assert struct.unpack("<I", data[8:12])[0] == zlib.adler32(data[12:]) & 0xffffffff, "DEX Adler-32 mismatch"
assert data[0x122510:0x122518] == bytes.fromhex("1216000000000000"), "Expected patch not found"
print("PASS: DEX integrity and normal-calculation gate patch")
