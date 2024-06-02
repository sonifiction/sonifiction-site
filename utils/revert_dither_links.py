import os
import re
import argparse

def revert_all_images_in_markdown(folder_path):
    # Regular expression to match markdown image syntax ![alt text](image_url)
    markdown_image_regex = re.compile(r'!\[(.*?)\]\((dithers/(.*?))_dithered\.png\)')
    
    # Regular expression to match HTML image syntax <img src="image_url" alt="alt_text" />
    html_image_regex = re.compile(r'<img\s+[^>]*src=["\'](dithers/(.*?))_dithered\.png["\'][^>]*alt=["\'](.*?)["\'][^>]*>')
    
    # Walk through all directories and files in the specified folder
    for root, _, files in os.walk(folder_path):
        for filename in files:
            # Process only markdown files
            if filename.endswith(".md"):
                file_path = os.path.join(root, filename)
                
                # Read the contents of the file
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # Function to revert markdown image links
                def revert_markdown_image_link(match):
                    alt_text = match.group(1)
                    original_image_name = match.group(3)
                    original_image_url = f'{original_image_name}.jpg'
                    
                    return f'![{alt_text}]({original_image_url})'
                
                # Function to revert HTML image links
                def revert_html_image_link(match):
                    original_image_name = match.group(2)
                    alt_text = match.group(3)
                    original_image_url = f'{original_image_name}.jpg'
                    
                    return f'<img src="{original_image_url}" alt="{alt_text}" />'
                
                # Revert all markdown image links using the function
                new_content = re.sub(markdown_image_regex, revert_markdown_image_link, content)
                
                # Revert all HTML image links using the function
                new_content = re.sub(html_image_regex, revert_html_image_link, new_content)
                
                # Write the modified content back to the file
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                
                print(f"Processed file: {file_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Revert image links in markdown files to their original state.')
    parser.add_argument('folder_path', type=str, help='Path to the folder containing markdown files.')
    args = parser.parse_args()
    
    revert_all_images_in_markdown(args.folder_path)
