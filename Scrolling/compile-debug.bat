call "C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\vcvarsall.bat" x86_amd64
del .\build\debug\Leapdev.exe
cl /EHsc /Zi /I .\include .\source\scrolling.cpp /link .\lib\debug\Leapd.lib user32.lib /OUT:.\build\debug\presentation.exe /DEBUG > ./log.txt
del presentation.obj
del vc120.pdb
del .\build\debug\presentation.ilk
del .\build\debug\presentation.pdb