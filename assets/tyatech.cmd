@echo off
setlocal

set NODE_COMMAND=node
set NPM_COMMAND=npm
set VERSION=3.0.3

if "%1"=="new" (
    rem Check if Node.js is installed or not
    %NODE_COMMAND% --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo Node.js not installed
        echo Please install Node.js version 14.x.x
    )

    rem Check the version of Node.js
    for /f "delims=" %%v in ('%NODE_COMMAND% --version') do set NODE_VERSION=%%v
    echo Node.js version: %NODE_VERSION%

    rem Check Node.js version Conformity
    echo Check Node.js version Conformity...

    %NODE_COMMAND% -e "if (parseFloat(process.versions.node) >= 15.0) process.exit(1)"

    if %errorlevel% neq 0 (
        echo Node.js version should be 14.x.x. Please update Node.js version to continue.
        exit /b 1
    )

    %NODE_COMMAND% -e "if (parseFloat(process.versions.node) < 14.0) process.exit(1)"

    if %errorlevel% neq 0 (
        echo Node.js version should be 14.x.x. Please update Node.js version to continue.
        exit /b 1
    )

    set target_directory=%~2

    echo Creating new Tyatech Nestjs System API project...
    git clone --depth 1 https://github.com/TYA-Technologies/tyatech-nestjs.git %~2

    echo Directory navigation %~2...
    cd %~2
    npx rimraf .git
        
    echo Installing dependencies %~2...    
    cd %~2
    npm install

    echo Project created successfully!
)

if "%1"=="-v" (
  echo v%VERSION%
) 

if "%1"=="version" (
  echo v%VERSION%
) 