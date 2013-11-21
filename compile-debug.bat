call "C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\vcvarsall.bat" x86_amd64
del .\build\debug\Leapdev.exe
cl /EHsc /Zi /I .\include /I .\JuceLibraryCode .\source\Leapdev.cpp /link .\lib\debug\Leapd.lib /OUT:.\build\debug\Leapdev.exe /DEBUG > ./log.txt
del Leapdev.obj
del vc120.pdb
del .\build\debug\Leapdev.ilk
del .\build\debug\Leapdev.pdb