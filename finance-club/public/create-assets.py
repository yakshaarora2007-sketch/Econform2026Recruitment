#!/usr/bin/env python3
"""
Generate Monopoly board game assets for ECON Recruitment form
Uses PIL to create PNG images based on the reference design
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create public directory if it doesn't exist
PUBLIC_DIR = os.path.dirname(os.path.abspath(__file__))

def create_monopoly_step_cards():
    """Create the 4 colored step cards (PLAYER, IDENTITY, MARKET, DEAL)"""
    
    # Active cards (bright, saturated)
    colors_active = {
        'player': ('#CC0000', '#FFFFFF'),      # Red
        'identity': ('#F2C623', '#000000'),    # Yellow
        'market': ('#00A651', '#FFFFFF'),      # Green
        'deal': ('#0052CC', '#FFFFFF')         # Blue
    }
    
    # Inactive cards (pale, washed out)
    colors_inactive = {
        'player': ('#F5E6D3', '#CC0000'),      # Pale Red
        'identity': ('#FFFBF0', '#F2C623'),    # Pale Yellow
        'market': ('#E8F4ED', '#00A651'),      # Pale Green
        'deal': ('#EBF0FF', '#0052CC')         # Pale Blue
    }
    
    icons_text = {
        'player': '🎩',
        'identity': '🏛️',
        'market': '📈',
        'deal': '🤝'
    }
    
    # Create active cards
    for step_name, (bg_color, text_color) in colors_active.items():
        img = Image.new('RGBA', (120, 140), (255, 255, 255, 0))
        draw = ImageDraw.Draw(img)
        
        # Background rectangle with rounded corners
        draw.rounded_rectangle([0, 0, 119, 139], fill=bg_color, outline='#333', width=2, radius=8)
        
        # Step number
        text = step_number = {'player': '01', 'identity': '02', 'market': '03', 'deal': '04'}[step_name]
        draw.text((60, 30), text, fill=text_color, anchor='mm', font=None)
        
        # Step icon (text-based fallback)
        draw.text((60, 70), icons_text[step_name], fill=text_color, anchor='mm', font=None)
        
        # Step name
        draw.text((60, 110), step_name.upper(), fill=text_color, anchor='mm', font=None)
        
        img.save(os.path.join(PUBLIC_DIR, f'step-{step_name}-active.png'))
    
    # Create inactive cards
    for step_name, (bg_color, text_color) in colors_inactive.items():
        img = Image.new('RGBA', (120, 140), (255, 255, 255, 0))
        draw = ImageDraw.Draw(img)
        
        # Background rectangle with rounded corners
        draw.rounded_rectangle([0, 0, 119, 139], fill=bg_color, outline='#CCC', width=1, radius=8)
        
        # Step number
        step_number = {'player': '01', 'identity': '02', 'market': '03', 'deal': '04'}[step_name]
        draw.text((60, 30), step_number, fill=text_color, anchor='mm', font=None)
        
        # Step icon (text-based fallback)
        draw.text((60, 70), icons_text[step_name], fill=text_color, anchor='mm', font=None)
        
        # Step name
        draw.text((60, 110), step_name.upper(), fill=text_color, anchor='mm', font=None)
        
        img.save(os.path.join(PUBLIC_DIR, f'step-{step_name}-inactive.png'))

print("Asset generation script created. Note: PIL-based generation requires PIL library.")
print("Consider using the reference image assets directly or designing in a graphics tool.")
