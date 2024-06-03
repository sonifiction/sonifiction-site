import os
import re
import argparse

def replace_all_images_in_markdown(folder_path):
    # Regular expression to match markdown image syntax ![alt text](image_url)
    markdown_image_regex = re.compile(r'!\[(.*?)\]\((.*?)\)')
    
    # Regular expression to match HTML image syntax <img src="image_url" alt="alt_text" />
    html_image_regex = re.compile(r'<img\s+[^>]*src=["\'](.*?)["\'][^>]*alt=["\'](.*?)["\'][^>]*>')
    
    # Walk through all directories and files in the specified folder
    for root, _, files in os.walk(folder_path):
        for filename in files:
            # Process only markdown files
            if filename.endswith(".md"):
                file_path = os.path.join(root, filename)
                
                # Read the contents of the file
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # Function to replace markdown image links
                def replace_markdown_image_link(match):
                    alt_text = match.group(1)
                    image_url = match.group(2)
                    
                    # Check if the image already has "dithered" in its path
                    if 'dithered' in image_url:
                        return match.group(0)
                    
                    # Remove the file extension and create new image path
                    image_name = os.path.splitext(os.path.basename(image_url))[0]
                    new_image_url = f'dithers/{image_name}_dithered.png'
                    
                    return f'![{alt_text}]({new_image_url})'
                
                # Function to replace HTML image links
                def replace_html_image_link(match):
                    image_url = match.group(1)
                    alt_text = match.group(2)
                    
                    # Check if the image already has "dithered" in its path
                    if 'dithered' in image_url:
                        return match.group(0)
                    
                    # Remove the file extension and create new image path
                    image_name = os.path.splitext(os.path.basename(image_url))[0]
                    new_image_url = f'dithers/{image_name}_dithered.png'
                    
                    return f'<img src="{new_image_url}" alt="{alt_text}" />'
                
                # Replace all markdown image links using the function
                new_content = re.sub(markdown_image_regex, replace_markdown_image_link, content)
                
                # Replace all HTML image links using the function
                new_content = re.sub(html_image_regex, replace_html_image_link, new_content)
                
                # Write the modified content back to the file
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                
                print(f"Processed file: {file_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Replace image links in markdown files.')
    parser.add_argument('folder_path', type=str, help='Path to the folder containing markdown files.')
    args = parser.parse_args()
    
    replace_all_images_in_markdown(args.folder_path)
