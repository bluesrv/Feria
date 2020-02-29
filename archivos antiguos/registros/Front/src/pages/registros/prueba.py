
id='1'
readFile = open("../Registros.vue")

mensaje ="""

    <h4> egvevge</h4>
    dxgfhjdxfcg
    <h2>hola</h2>
    </div>
"""

lines = readFile.readlines()
print(lines)
lines[-2] = mensaje

readFile.close()

f = open("../Registros.vue",'w')
f.writelines([item for item in lines])

#f.write(mensaje)
f.close()
