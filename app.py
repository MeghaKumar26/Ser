from flask import Flask, render_template, request, jsonify
import openai  # Install with `pip install openai`

app = Flask(__name__)

# OpenAI API Key (Replace with your API key)
openai.api_key = "" 
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get-response', methods=['POST'])
def get_response():
    user_message = request.json.get("message")

    try:
        # Query OpenAI's GPT model for a response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Serene AI, a mental health chatbot. Provide helpful, calming, and friendly responses."},
                {"role": "user", "content": user_message}
            ]
        )
        bot_message = response.choices[0].message["content"]
        return jsonify({"response": bot_message})

    except Exception as e:
        return jsonify({"response": "Sorry, I encountered an error. Try again later."})

if __name__ == '__main__':
    app.run(debug=True)
