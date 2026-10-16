# -*- coding: utf-8 -*-
"""教材 docx（MinerU 输出）→ Markdown，本地转换，绕过 MinerU 200 页限制。"""
import zipfile, re, sys
from xml.etree import ElementTree as ET

W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
NS = {'w': W}

def qn(tag):
    return '{%s}%s' % (W, tag)

def para_level(p):
    ppr = p.find('w:pPr', NS)
    if ppr is None:
        return 0
    ps = ppr.find('w:pStyle', NS)
    if ps is None:
        return 0
    val = ps.get(qn('val'), '')
    m = re.match(r'(?:Heading|heading)?([1-6])$', val)
    if m:
        return int(m.group(1))
    return 0

def convert(path, out):
    with zipfile.ZipFile(path) as z:
        root = ET.fromstring(z.read('word/document.xml'))
    body = root.find('w:body', NS)
    lines = []
    in_code = False
    for p in body.iter(qn('p')):
        texts = [t.text or '' for t in p.iter(qn('t'))]
        line = ''.join(texts).rstrip()
        if not line.strip():
            continue
        lvl = para_level(p)
        if lvl:
            if in_code:
                lines.append('```')
                in_code = False
            lines.append('')
            lines.append('#' * lvl + ' ' + line.strip())
            lines.append('')
        else:
            # MinerU 导出的代码块段落通常以 4 空格缩进或含典型代码符号
            stripped = line.strip()
            looks_code = re.match(r'^(#include|using|int |void |double |char |bool |class |struct |template|cout|cin|return|if |for |while |\{|\}|//)', stripped) and (line.startswith('    ') or line.startswith('\t'))
            if looks_code and not in_code:
                lines.append('```cpp')
                in_code = True
            elif not looks_code and in_code and len(lines) > 0:
                lines.append('```')
                in_code = False
            lines.append(line if in_code else line)
    if in_code:
        lines.append('```')
    with open(out, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(out, '->', len(lines), 'lines')

if __name__ == '__main__':
    convert('教材/MinerU_docx_C++程序设计2019版_1-200.docx', 'materials/parsed/textbook_1-200.md')
    convert('教材/MinerU_docx_C++程序设计2019版_201-3397.docx', 'materials/parsed/textbook_201-339.md')
