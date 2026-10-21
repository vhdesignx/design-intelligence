"""Busca somente leitura. Funciona por junction; não depende de Pillow."""
from pathlib import Path
import argparse,json,unicodedata,sys
if hasattr(sys.stdout,'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path(__file__).resolve().parents[3]
def normal(s):
    return ''.join(c for c in unicodedata.normalize('NFD',s.casefold()) if unicodedata.category(c)!='Mn')
p=argparse.ArgumentParser();p.add_argument('command',choices=['search','status']);p.add_argument('query',nargs='?',default='');p.add_argument('--limit',type=int,default=4)
a=p.parse_args()
catalog=ROOT/'biblioteca/catalogo.json'
if catalog.exists():
    data=json.loads(catalog.read_text(encoding='utf-8'))
elif (ROOT/'data.js').exists():
    # A distribuição contém somente o acervo já publicado. Não executa JavaScript.
    source=(ROOT/'data.js').read_text(encoding='utf-8')
    data=json.JSONDecoder().raw_decode(source.split('const CATALOG = ',1)[1])[0]
else:
    p.exit(2,'Acervo não encontrado. Mantenha a estrutura skills/ dentro do Design Intelligence ou consulte referências externas.\n')
if a.command=='status':
    print(json.dumps({'total':len(data['references']),'reviewed':sum(r['review']['status']=='reviewed' for r in data['references']),'missing':data.get('missing',[])},ensure_ascii=False))
else:
    rows=[r for r in data['references'] if all(t in normal(json.dumps(r,ensure_ascii=False)) for t in normal(a.query).split())]
    out=[]
    for r in rows[:a.limit]:
        out.append({'id':r['id'],'image_to_open':str(ROOT/r['preview']),'original':str(ROOT/r['file']),'timeline':str(ROOT/r['timeline']) if r.get('timeline') else None,'author':r['author'],'analysis':r['review']})
    print(json.dumps({'matches':len(rows),'instruction':'Abra as imagens antes de extrair uma direção. Crítica não é evidência de uso.','references':out},ensure_ascii=False,indent=2))
