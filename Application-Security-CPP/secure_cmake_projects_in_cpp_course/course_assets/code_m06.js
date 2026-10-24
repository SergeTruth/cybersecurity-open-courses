window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Measure a fixed application-owned compiler through a bounded regular-file descriptor, then execute that same descriptor through a private compiler launcher.",
  codeExamples: [
    {
      title: "Validate toolchain and environment control",
      language: "cmake",
      blurb: "Before enabling C++, configuration rejects ambient overrides, requires the private verified launcher, and compares descriptor-produced evidence with the reviewed digest.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
set(REVIEWED_TOOLCHAIN_SHA256 "" CACHE STRING "Reviewed toolchain digest")
set(OBSERVED_TOOLCHAIN_SHA256 "" CACHE STRING "Descriptor-observed digest")
set(CONTROLLED_CXX_COMPILER "" CACHE FILEPATH
  "Private descriptor-executing compiler launcher")
string(LENGTH "${"$"}{REVIEWED_TOOLCHAIN_SHA256}" toolchain_digest_length)
string(LENGTH "${"$"}{OBSERVED_TOOLCHAIN_SHA256}" observed_digest_length)
if(NOT toolchain_digest_length EQUAL 64 OR
   NOT observed_digest_length EQUAL 64 OR
   NOT REVIEWED_TOOLCHAIN_SHA256 MATCHES "^[0-9a-f]+$" OR
   NOT OBSERVED_TOOLCHAIN_SHA256 MATCHES "^[0-9a-f]+$")
  message(FATAL_ERROR "canonical reviewed and observed digests required")
endif()
if(DEFINED CMAKE_CXX_COMPILER OR DEFINED CMAKE_TOOLCHAIN_FILE OR
   DEFINED CMAKE_CXX_COMPILER_LAUNCHER OR
   DEFINED ENV{CMAKE_CXX_COMPILER_LAUNCHER} OR
   DEFINED CMAKE_PREFIX_PATH OR DEFINED ENV{CMAKE_PREFIX_PATH} OR
   DEFINED ENV{CXX})
  message(FATAL_ERROR "ambient toolchain override rejected")
endif()
set(expected_compiler_launcher
  "${"$"}{CMAKE_BINARY_DIR}/reviewed-cxx")
if(NOT CONTROLLED_CXX_COMPILER STREQUAL expected_compiler_launcher OR
   NOT EXISTS "${"$"}{expected_compiler_launcher}" OR
   IS_DIRECTORY "${"$"}{expected_compiler_launcher}")
  message(FATAL_ERROR "private verified compiler launcher required")
endif()
if(NOT OBSERVED_TOOLCHAIN_SHA256 STREQUAL REVIEWED_TOOLCHAIN_SHA256)
  message(FATAL_ERROR "compiler does not match reviewed toolchain digest")
endif()
set(CMAKE_CXX_COMPILER "${"$"}{CONTROLLED_CXX_COMPILER}"
  CACHE FILEPATH "Verified compiler" FORCE)
project(controlled_toolchain LANGUAGES CXX)
include(CTest)

file(WRITE "${"$"}{CMAKE_BINARY_DIR}/toolchain_identity.cpp" [=[
#include <string_view>
int main() {
  constexpr std::string_view reviewed{REVIEWED_DIGEST};
  constexpr std::string_view observed{OBSERVED_DIGEST};
  return reviewed.size() == 64 && reviewed == observed ? 0 : 1;
}
]=])
add_executable(toolchain_identity
  "${"$"}{CMAKE_BINARY_DIR}/toolchain_identity.cpp")
target_compile_features(toolchain_identity PRIVATE cxx_std_20)
target_compile_definitions(toolchain_identity PRIVATE
  REVIEWED_DIGEST="${"$"}{REVIEWED_TOOLCHAIN_SHA256}"
  OBSERVED_DIGEST="${"$"}{OBSERVED_TOOLCHAIN_SHA256}")
add_test(NAME controlled_toolchain COMMAND toolchain_identity)`
    },
    {
      title: "Configure with reviewed toolchain evidence",
      language: "bash",
      blurb: "A private Python launcher validates the reviewed compiler on every invocation and descriptor-executes those same bytes; a replacement regression proves later pathname changes cannot substitute the executable.",
      code: String.raw`#!/bin/sh
set -eu
if [ "$#" -ne 1 ]; then
  /usr/bin/printf 'usage: %s REVIEWED_COMPILER_SHA256\n' "$0" >&2
  exit 64
fi
project_root=$(CDPATH= cd -- "$(/usr/bin/dirname -- "$0")" && /bin/pwd -P)
build_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-build.XXXXXXXXXX
)
rejected_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-rejected.XXXXXXXXXX
)
trap '/bin/rm -rf -- "$build_root" "$rejected_root"' EXIT HUP INT TERM
digest=$1
compiler=/usr/bin/g++
launcher="$build_root/reviewed-cxx"
observed=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/python3 -c '
import hashlib
import os
import stat
import sys

limit = 128 * 1024 * 1024
requested = sys.argv[1]
if requested != "/usr/bin/g++":
    raise SystemExit("application-owned compiler path required")
for required in ("O_CLOEXEC", "O_NOFOLLOW", "O_NONBLOCK"):
    if not hasattr(os, required):
        raise SystemExit("required descriptor protections unavailable")
resolved = os.path.realpath(requested)
flags = os.O_RDONLY | os.O_CLOEXEC | os.O_NOFOLLOW | os.O_NONBLOCK
descriptor = os.open(resolved, flags)
try:
    before = os.fstat(descriptor)
    if not stat.S_ISREG(before.st_mode):
        raise SystemExit("regular compiler file required")
    if before.st_uid != 0 or before.st_mode & 0o022:
        raise SystemExit("root-owned non-writable compiler required")
    if before.st_size <= 0 or before.st_size > limit:
        raise SystemExit("compiler size outside policy")
    if before.st_mode & 0o111 == 0:
        raise SystemExit("executable compiler file required")
    digest = hashlib.sha256()
    total = 0
    while True:
        chunk = os.read(descriptor, min(65536, limit + 1 - total))
        if not chunk:
            break
        total += len(chunk)
        if total > limit:
            raise SystemExit("compiler exceeds byte ceiling")
        digest.update(chunk)
    after = os.fstat(descriptor)
    identity_before = (
        before.st_dev, before.st_ino, before.st_size, before.st_mtime_ns,
        before.st_ctime_ns, before.st_mode, before.st_uid
    )
    identity_after = (
        after.st_dev, after.st_ino, after.st_size, after.st_mtime_ns,
        after.st_ctime_ns, after.st_mode, after.st_uid
    )
    if identity_before != identity_after:
        raise SystemExit("compiler changed during verification")
    print(digest.hexdigest())
finally:
    os.close(descriptor)
' "$compiler"
)
if [ "$observed" != "$digest" ]; then
  /usr/bin/printf 'compiler does not match reviewed digest\n' >&2
  exit 1
fi
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/python3 - "$launcher" <<'PYTHON'
import os
import sys

source = r'''#!/usr/bin/python3
import hashlib
import os
import re
import stat
import sys

limit = 128 * 1024 * 1024
requested = os.environ.get("REVIEWED_COMPILER_PATH", "")
expected = os.environ.get("REVIEWED_COMPILER_SHA256", "")
if requested != "/usr/bin/g++":
    raise SystemExit("application-owned compiler path required")
if re.fullmatch(r"[0-9a-f]{64}", expected) is None:
    raise SystemExit("canonical reviewed compiler digest required")
if os.execve not in os.supports_fd:
    raise SystemExit("descriptor execution is unavailable")
for required in ("O_CLOEXEC", "O_NOFOLLOW", "O_NONBLOCK"):
    if not hasattr(os, required):
        raise SystemExit("required descriptor protections unavailable")

resolved = os.path.realpath(requested)
flags = os.O_RDONLY | os.O_CLOEXEC | os.O_NOFOLLOW | os.O_NONBLOCK
descriptor = os.open(resolved, flags)
try:
    before = os.fstat(descriptor)
    if not stat.S_ISREG(before.st_mode):
        raise SystemExit("regular compiler file required")
    if before.st_uid != 0 or before.st_mode & 0o022:
        raise SystemExit("root-owned non-writable compiler required")
    if before.st_size <= 0 or before.st_size > limit:
        raise SystemExit("compiler size outside policy")
    if before.st_mode & 0o111 == 0:
        raise SystemExit("executable compiler file required")
    measured = hashlib.sha256()
    total = 0
    while True:
        chunk = os.read(descriptor, min(65536, limit + 1 - total))
        if not chunk:
            break
        total += len(chunk)
        if total > limit:
            raise SystemExit("compiler exceeds byte ceiling")
        measured.update(chunk)
    after = os.fstat(descriptor)
    identity_before = (
        before.st_dev, before.st_ino, before.st_size, before.st_mtime_ns,
        before.st_ctime_ns, before.st_mode, before.st_uid
    )
    identity_after = (
        after.st_dev, after.st_ino, after.st_size, after.st_mtime_ns,
        after.st_ctime_ns, after.st_mode, after.st_uid
    )
    if identity_before != identity_after:
        raise SystemExit("compiler changed during verification")
    if measured.hexdigest() != expected:
        raise SystemExit("compiler does not match reviewed digest")
    os.set_inheritable(descriptor, True)
    os.execve(descriptor, [requested, *sys.argv[1:]], os.environ)
finally:
    os.close(descriptor)
'''

output = sys.argv[1]
flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_CLOEXEC
if hasattr(os, "O_NOFOLLOW"):
    flags |= os.O_NOFOLLOW
descriptor = os.open(output, flags, 0o500)
try:
    encoded = source.encode("utf-8")
    offset = 0
    while offset < len(encoded):
        offset += os.write(descriptor, encoded[offset:])
    os.fsync(descriptor)
finally:
    os.close(descriptor)
PYTHON

/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/python3 -c '
import hashlib
import os
import shutil
import sys

root = sys.argv[1]
original = os.path.join(root, "compiler-under-test")
replacement = os.path.join(root, "replacement")
shutil.copyfile("/usr/bin/true", original)
shutil.copyfile("/usr/bin/false", replacement)
os.chmod(original, 0o500)
os.chmod(replacement, 0o500)
descriptor = os.open(original, os.O_RDONLY | os.O_CLOEXEC | os.O_NOFOLLOW)
try:
    measured = hashlib.sha256()
    while True:
        chunk = os.read(descriptor, 65536)
        if not chunk:
            break
        measured.update(chunk)
    original_digest = measured.hexdigest()
    os.replace(replacement, original)
    with open(original, "rb") as replaced:
        replacement_digest = hashlib.sha256(replaced.read()).hexdigest()
    if replacement_digest == original_digest:
        raise SystemExit("replacement regression requires distinct binaries")
    if os.execve not in os.supports_fd:
        raise SystemExit("descriptor execution is unavailable")
    child = os.fork()
    if child == 0:
        try:
            os.set_inheritable(descriptor, True)
            os.execve(descriptor, [original], {"PATH": "/usr/bin:/bin"})
        except BaseException:
            os._exit(125)
    _, status = os.waitpid(child, 0)
    if not os.WIFEXITED(status) or os.WEXITSTATUS(status) != 0:
        raise SystemExit("descriptor execution followed replacement path")
finally:
    os.close(descriptor)
' "$rejected_root"
if /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake -S "$project_root" -B "$rejected_root" --fresh \
    -DCONTROLLED_CXX_COMPILER=/dev/null \
    -DREVIEWED_TOOLCHAIN_SHA256="$digest" \
    -DOBSERVED_TOOLCHAIN_SHA256="$observed" >/dev/null 2>&1
then
  /usr/bin/printf 'special-file compiler override was accepted\n' >&2
  exit 1
fi
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  REVIEWED_COMPILER_PATH="$compiler" \
  REVIEWED_COMPILER_SHA256="$digest" \
  /usr/bin/cmake -S "$project_root" -B "$build_root" --fresh \
    -DCONTROLLED_CXX_COMPILER="$launcher" \
    -DREVIEWED_TOOLCHAIN_SHA256="$digest" \
    -DOBSERVED_TOOLCHAIN_SHA256="$observed"
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  REVIEWED_COMPILER_PATH="$compiler" \
  REVIEWED_COMPILER_SHA256="$digest" \
  /usr/bin/cmake --build "$build_root"
(
  cd "$build_root"
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/ctest --output-on-failure
)`
    }
  ]
};
