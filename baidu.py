import re
import sys

r=re.compile(r'https://luojia.work/[^<]*\.html')
content=re.findall(r,sys.argv[1])
op_xml_txt=open('urls.txt','a')
for i in content:
  op_xml_txt.write('%s\n'%i)