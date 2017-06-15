import RPi.GPIO as GPIO
import time

sensor = 16
GPIO.setmode(GPIO.BCM)
GPIO.setup(sensor, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
current = GPIO.input(sensor)
previous = current
def printState(current):
    print 'GPIO pin %s is %s' % (sensor, 'HIGH' if current else 'LOW')
printState(current)
while True:
    current = GPIO.input(sensor)
    if current != previous:
        printState(current)
    previous = current
    time.sleep(0.1)
GPIO.cleanup()
