call "C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\vcvarsall.bat" x86_amd64
del .\build\release\Leapdev.exe
cl /EHsc /I .\include .\source\Leapdev.cpp /link .\lib\release\Leap.lib /OUT:.\build\release\Leapdev.exe
del Leapdev.obj