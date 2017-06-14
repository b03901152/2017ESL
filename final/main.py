#!/usr/bin/python3
import sys
import os
import subprocess as sub
import time
import RPi.GPIO as GPIO
import Adafruit_CharLCD as LCD

# pin setup
GPIO_servo1 = 18;
GPIO_servo2 = 23;
GPIO_servo3 = 24;
lcd_rs = 5
lcd_en = 6
lcd_d4 = 13
lcd_d5 = 19
lcd_d6 = 26
lcd_d7 = 21
lcd_backlight = 2

# servo1
servo1_anti = 'pigs s {} 1000'.format(GPIO_servo1)
servo1_stop = 'pigs s {} 1530'.format(GPIO_servo1)
servo1_norm = 'pigs s {} 2000'.format(GPIO_servo1)
# servo2
servo2_anti = 'pigs s {} 1000'.format(GPIO_servo2)
servo2_stop = 'pigs s {} 1530'.format(GPIO_servo2)
servo2_norm = 'pigs s {} 2000'.format(GPIO_servo2)
# servo3
servo3_anti = 'pigs s {} 1000'.format(GPIO_servo3)
servo3_stop = 'pigs s {} 1485'.format(GPIO_servo3)
servo3_norm = 'pigs s {} 2000'.format(GPIO_servo3)

# Define LCD column and row size for 16x2 LCD.
lcd_columns = 16
lcd_rows = 2
lcd = LCD.Adafruit_CharLCD(lcd_rs,
			   lcd_en,
			   lcd_d4,
			   lcd_d5,
			   lcd_d6,
			   lcd_d7,
			   lcd_columns,
			   lcd_rows,
			   lcd_backlight)

lcd.message('La Ping\nNo GG!!!')
# Wait 5 seconds
time.sleep(5)
lcd.clear()
lcd.message('Chou Ping\nLa Mei Zi!!!')

time.sleep(5)
lcd.clear()

GPIO_input1 = 17
GPIO_input2 = 17
GPIO_input3 = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(GPIO_input1, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(GPIO_input2, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(GPIO_input3, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)

while True:
    ins1 = int(input("servo1: "))
    ins2 = int(input("servo2: "))
    ins3 = int(input("servo3: "))
    value1 = GPIO.input(GPIO_input1)
    if   ins1 == 1:
        os.popen(servo1_anti)
    elif ins1 == 2:
        os.popen(servo1_stop)
    elif ins1 == 3:
        os.popen(servo1_norm)
    if   ins2 == 1:
        os.popen(servo2_anti)
    elif ins2 == 2:
        os.popen(servo2_stop)
    elif ins2 == 3:
        os.popen(servo2_norm)
    if   ins3 == 1:
        os.popen(servo3_anti)
    elif ins3 == 2:
        os.popen(servo3_stop)
    elif ins3 == 3:
        os.popen(servo3_norm)



