#!/bin/bash -v

set -e

mkdir -p output
cp platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk output/app-release-unsigned.apk

