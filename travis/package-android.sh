#!/bin/bash -v

set -e

mkdir -p output
cp platforms/android/build/outputs/apk/android-release-unsigned.apk output/ionictravis-release-unsigned.apk

