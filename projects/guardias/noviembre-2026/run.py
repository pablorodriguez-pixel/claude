import sys, random, pickle
sys.path.insert(0, __import__('os').path.dirname(__import__('os').path.abspath(__file__)))
import nov
mejor, mc = None, 1e9
for semilla in range(6):
    random.seed(semilla*13+1)
    e = nov.inicial()
    b, c = nov.recocido(e, 250000)
    if c < mc: mejor, mc = b, c
    print(f"  semilla {semilla}: {c:.1f}")
print("MEJOR %.1f" % mc)
pickle.dump(mejor, open('best.pkl','wb'))
