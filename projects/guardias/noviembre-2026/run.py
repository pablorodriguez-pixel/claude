import sys, random, pickle
sys.path.insert(0,'/tmp/claude-0/-home-user/c759d0bb-1783-5702-b280-635337ae27ea/scratchpad/guardias')
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
