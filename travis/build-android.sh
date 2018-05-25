#!/bin/bash -v
set -e
# Build Ionic App for Android
ionic cordova platform add android --nofetch
ionic cordova build android

