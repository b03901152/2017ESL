import time
import sys
def dummy() :
    out = '';
    for i in range(10) :
        out = str(i + 1)
        print(out)
        sys.stdout.flush()
        time.sleep(0.4)
if __name__ =='__main__' :
    # sys.stdout = Unbuffered(sys.stdout)
    dummy = dummy()
