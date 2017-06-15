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


lcd.message('La Ping\nNo GG!!!')
# Wait 5 seconds
time.sleep(3)
lcd.clear()
lcd.message('Chou Ping\nLa Mei Zi!!!')

time.sleep(3)
lcd.clear()

GPIO.setmode(GPIO.BCM)
GPIO.setup(GPIO_input1, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(GPIO_input2, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(GPIO_input3, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)

cur1 = GPIO.input(GPIO_input1)
cur2 = GPIO.input(GPIO_input2)
cur3 = GPIO.input(GPIO_input3)
prev1 = cur1
prev2 = cur2
prev3 = cur3

while True:
    cur1 = GPIO.input(GPIO_input1)
    cur2 = GPIO.input(GPIO_input2)
    cur3 = GPIO.input(GPIO_input3)
    if cur1 != prev1:
        lcd.message('Item 1!\nLaPing noGG')
        time.sleep(3)
        lcd.clear()
        os.popen(servo1_anti)
        time.sleep(5)
        os.popen(servo1_stop)
    if cur2 != prev2:
        lcd.message('Item 2!\nLaPing noGG')
        time.sleep(3)
        lcd.clear()
        os.popen(servo2_anti)
        time.sleep(5)
        os.popen(servo2_stop)
    if cur3 != prev3:
        lcd.message('Item 3!\nLaPing noGG')
        time.sleep(3)
        lcd.clear()
        os.popen(servo3_anti)
        time.sleep(5)
        os.popen(servo3_stop)
    os.popen(servo1_stop)
    os.popen(servo2_stop)
    os.popen(servo3_stop)
    prev1 = cur1
    prev2 = cur2
    prev3 = cur3
    time.sleep(2)

GPIO.cleanup()


