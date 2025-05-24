import re
import sys
from collections import OrderedDict

# Regex for matching colors (hex, rgb(a), hsl(a), named colors)
COLOR_REGEX = re.compile(r'(?i)(#[0-9a-f]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)|\b[a-z]{3,}\b)')

# List of common named colors (CSS3)
CSS_NAMED_COLORS = set([
    'aliceblue','antiquewhite','aqua','aquamarine','azure','beige','bisque','black','blanchedalmond','blue',
    'blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson',
    'cyan','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkgrey','darkkhaki','darkmagenta','darkolivegreen',
    'darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise',
    'darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','fuchsia',
    'gainsboro','ghostwhite','gold','goldenrod','gray','green','greenyellow','grey','honeydew','hotpink','indianred','indigo',
    'ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow',
    'lightgray','lightgreen','lightgrey','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey',
    'lightsteelblue','lightyellow','lime','limegreen','linen','magenta','maroon','mediumaquamarine','mediumblue','mediumorchid',
    'mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue',
    'mintcream','mistyrose','moccasin','navajowhite','navy','oldlace','olive','olivedrab','orange','orangered','orchid','palegoldenrod',
    'palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','purple','rebeccapurple',
    'red','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','silver','skyblue','slateblue',
    'slategray','slategrey','snow','springgreen','steelblue','tan','teal','thistle','tomato','turquoise','violet','wheat','white',
    'whitesmoke','yellow','yellowgreen'
])

def is_color(value):
    value = value.lower()
    if value.startswith('#') or value.startswith('rgb') or value.startswith('hsl'):
        return True
    return value in CSS_NAMED_COLORS

def parse_colors(css):
    colors = OrderedDict()
    for match in COLOR_REGEX.finditer(css):
        color = match.group(0)
        if is_color(color) and color not in colors:
            colors[color] = None
    return list(colors.keys())

def make_varname(idx):
    return f'--color-{idx+1}'

def replace_colors(css, color_map):
    def repl(match):
        color = match.group(0)
        if is_color(color):
            return f'var({color_map[color]})'
        return color
    return COLOR_REGEX.sub(repl, css)

def autoparse_colors(input_path, output_path=None):
    with open(input_path, encoding='utf-8') as f:
        css = f.read()
    colors = parse_colors(css)
    color_map = {c: make_varname(i) for i, c in enumerate(colors)}
    # Build :root block
    root = ':root {\n' + '\n'.join(f'  {v}: {k};' for k, v in color_map.items()) + '\n}\n\n'
    # Replace colors in CSS
    css_new = replace_colors(css, color_map)
    # Insert :root at the top
    css_new = root + css_new
    if output_path:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(css_new)
    else:
        print(css_new)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python autoparse_css_colors.py <input.css> [output.css]')
        sys.exit(1)
    autoparse_colors(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
