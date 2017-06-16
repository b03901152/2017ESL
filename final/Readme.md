# 2017ESL - final project
### "Vending" Machine

How to install:
This project should be executed on rpi 3
First, install needed scripts in PIGPIO and execute
```
cd PIGPIO
make
sudo make install
sudo pigpiod
```
Second, simply run the shell script 
```
cd 2017ESL/final/
./run.sh
```

Describes:

`Avalon`: The web server maintaining the information of vending machine records.

`PIGPIO`: The package enable some GPIO features.

`main.py`: The main operating script, describes the physical effect.

`clientForRPi3`: The web client that automatically send infromation from machine to server
