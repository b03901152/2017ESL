#!/usr/bin/python3
import sys
import os
import subprocess as sub
import time
import RPi.GPIO as GPIO
import Adafruit_CharLCD as LCD

# pin setup GPIO
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
GPIO_input1 = 12
GPIO_input2 = 16
GPIO_input3 = 20

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


lcd.message('Welcome to LaPing\nFuck you asshole')
# Wait 5 seconds
time.sleep(4)
lcd.clear()
lcd.message('c======3\n--- c=======3')

time.sleep(4)
lcd.clear()

GPIO.setmode(GPIO.BCM)
GPIO.setup(GPIO_input1, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(GPIO_input2, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(GPIO_input3, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)

cur1 = GPIO.input(GPIO_input1)
cur2 = GPIO.input(GPIO_input2)
cur3 = GPIO.input(GPIO_input3)
while True:
    cur1 = GPIO.input(GPIO_input1)
    cur2 = GPIO.input(GPIO_input2)
    cur3 = GPIO.input(GPIO_input3)
   # print(cur1)
   # print(cur2)
   # print(cur3)
   # in1 = int(input('type1: '))
   # in2 = int(input('type2: '))
   # in3 = int(input('type3: '))
   # if in1 == 1:
   #     os.popen(servo1_anti)
   # elif in1 == 2:
   #     os.popen(servo1_stop)
   # elif in1 == 3:
   #     os.popen(servo1_norm)
   # if in2 == 1:
   #     os.popen(servo2_anti)
   # elif in2 == 2:
   #     os.popen(servo2_stop)
   # elif in2 == 3:
   #     os.popen(servo2_norm)
   # if in3 == 1:
   #     os.popen(servo3_anti)
   # elif in3 == 2:
   #     os.popen(servo3_stop)
   # elif in3 == 3:
   #     os.popen(servo3_norm)
    if cur1 == 1:
        print(1)
        lcd.message('Item 1!\nLaPing noGG')
        time.sleep(2)
        lcd.clear()
        os.popen(servo1_norm)
        time.sleep(4)
        os.popen(servo1_stop)
    if cur2 == 1:
        print(2)
        lcd.message('Item 2!\nLaPing noGG')
        time.sleep(2)
        lcd.clear()
        os.popen(servo2_anti)
        time.sleep(4)
        os.popen(servo2_stop)
    if cur3 == 1:
        print(3)
        lcd.message('Item 3!\nLaPing noGG')
        time.sleep(2)
        lcd.clear()
        os.popen(servo3_anti)
        time.sleep(4)
        os.popen(servo3_stop)
    os.popen(servo1_stop)
    os.popen(servo2_stop)
    os.popen(servo3_stop)
    time.sleep(2)

GPIO.cleanup()
