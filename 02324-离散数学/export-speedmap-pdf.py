# 生成「章节速记图 + 高频公式 + 考前速记」连续排版打印 PDF（A4，浅色）
# 用法: python export-speedmap-pdf.py   （先跑 render_notes.py 重渲染 index.html，再跑本脚本；依赖 playwright）
from playwright.sync_api import sync_playwright
from urllib.parse import quote
import os

HERE = os.path.dirname(os.path.abspath(__file__))
url = 'file:///' + quote(os.path.join(HERE, 'index.html').replace('\\', '/'), safe='/:')

# buildSpeedmapView() 只收集 .speedmap 树状图；高频公式/考前速记两个 .ch 卡片在此手动克隆进视图
JS = """() => {
    const v = buildSpeedmapView(); if(!v) return 0;
    const st = document.createElement('style');
    st.textContent = '@media print { #speedmapView .sm-ch { overflow:visible !important; border-radius:0 !important; break-inside:auto !important; } #speedmapView .tree li { break-inside:auto !important; } #speedmapView .xtra .ch-body { display:block !important; background:none; border:0; padding:0; } } #speedmapView .xtra .ch-body { display:block !important; background:none; border:0; padding:0; }';
    v.appendChild(st);
    document.querySelectorAll('.ch').forEach(ch => {
        const t = ch.querySelector('.ch-title');
        if (!t || !/高频公式|考前速记/.test(t.textContent)) return;
        const body = ch.querySelector('.ch-body'); if (!body) return;
        const title = t.cloneNode(true);
        title.querySelectorAll('.badge,.arrow').forEach(b => b.remove());
        const box = document.createElement('div');
        box.className = 'sm-ch xtra';
        box.appendChild(title);
        const wrap = document.createElement('div'); wrap.className = 'sm-body';
        wrap.appendChild(body.cloneNode(true));
        box.appendChild(wrap);
        v.appendChild(box);
    });
    document.body.appendChild(v);
    document.body.classList.add('printing-speedmaps');
    return v.querySelectorAll('.sm-ch').length;
}"""

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(color_scheme='light')
    pg.goto(url, wait_until='domcontentloaded', timeout=30000)
    try:
        pg.wait_for_load_state('networkidle', timeout=8000)
    except Exception:
        pass
    pg.wait_for_timeout(1200)
    n = pg.evaluate(JS)
    print('打印视图块数:', n, '（应为 11：9 章速记图 + 高频公式 + 考前速记）')
    pg.pdf(path=os.path.join(HERE, '02324离散数学速记图.pdf'),
           format='A4', print_background=True, prefer_css_page_size=True)
    b.close()
