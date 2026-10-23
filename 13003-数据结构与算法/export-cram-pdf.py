# 生成「考前速记」单章打印 PDF（A4，浅色，全部展开、表格不跨页截断）
# 用法: python export-cram-pdf.py   （先跑 render_notes.py 重渲染 index.html，再跑本脚本；依赖 playwright）
from playwright.sync_api import sync_playwright
from urllib.parse import quote
import os

HERE = os.path.dirname(os.path.abspath(__file__))
url = 'file:///' + quote(os.path.join(HERE, 'index.html').replace('\\', '/'), safe='/:')

JS = """() => {
    let ch = null;
    document.querySelectorAll('.ch').forEach(c => {
        const t = c.querySelector('.ch-title');
        if (t && t.textContent.includes('考前速记')) ch = c;
    });
    if (!ch) return null;
    const view = document.createElement('div');
    view.id = 'cramView';
    const head = document.createElement('div');
    head.className = 'sm-head';
    const h1 = document.querySelector('header h1');
    head.textContent = (h1 ? h1.textContent.trim().replace(/\\s*·\\s*考点笔记$/, '') : '考点笔记') + ' · 考前速记';
    view.appendChild(head);
    const box = ch.cloneNode(true);
    box.classList.add('cram-ch');
    view.appendChild(box);
    const st = document.createElement('style');
    st.textContent = '@media print {'
        + ' body.cram-print > :not(#cramView) { display:none !important; }'
        + ' #cramView { display:block !important; }'
        + ' #cramView .ch { overflow:visible !important; border:0 !important; border-radius:0 !important;'
        + '   box-shadow:none !important; background:none !important; }'
        + ' #cramView .ch-title { cursor:default; break-after:avoid; padding:4px 0 8px 12px;'
        + '   border-bottom:1px solid var(--border-strong); margin-bottom:10px; }'
        + ' #cramView .ch-body { display:block !important; background:none; border:0; padding:0 0 0 12px; }'
        + ' #cramView .kp-detail { display:block !important; }'
        + ' #cramView table { break-inside:auto; } #cramView tr { break-inside:avoid; }'
        + '}';
    view.appendChild(st);
    document.body.appendChild(view);
    document.body.classList.add('cram-print');
    return true;
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
    ok = pg.evaluate(JS)
    if not ok:
        raise SystemExit('未找到「考前速记」章节')
    pg.pdf(path=os.path.join(HERE, '13003数据结构考前速记.pdf'),
           format='A4', print_background=True, prefer_css_page_size=True)
    b.close()
print('OK ->', os.path.join(HERE, '13003数据结构考前速记.pdf'))
