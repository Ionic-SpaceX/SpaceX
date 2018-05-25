#!/bin/bash -v

set -e

mkdir -p output
cp platforms/android/app/build/outputs/apk/debug/app-debug.apk output/ionictravis-release-unsigned.apk

