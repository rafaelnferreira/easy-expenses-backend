#!/bin/bash

rm -rf dist
mkdir dist
zip dist/distribution.zip -r . --exclude build.bash 
