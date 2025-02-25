import streamlit as st
import streamlit.components.v1 as components
import os

# Define the path to the weather_app directory (where your HTML, CSS, and JS are)
weather_app_dir = os.path.dirname(os.path.abspath(__file__))

# Function to load the HTML file
def load_html(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        html_string = f.read()
    return html_string

# Load the HTML content
html_file_path = os.path.join(weather_app_dir, "index.html")
html_string = load_html(html_file_path)

# Display the HTML in Streamlit
components.html(html_string, height=600, scrolling=False)

# Optional: Add some Streamlit elements around your weather card
st.title("Animated Weather Card")
st.write("Here's an interactive weather card created with HTML, CSS, and JavaScript.")
