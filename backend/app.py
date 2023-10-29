import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pytesseract
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Define a dictionary of food suggestions based on keywords
food_suggestions = {
    'tumor': {
        'morning': 'Include antioxidant-rich foods like berries and green tea.',
        'afternoon': 'Opt for a balanced meal with lean protein, vegetables, and whole grains.',
        'night': 'Consider a light, early dinner with vegetables and lean protein.'
    },
    'sugar': {
        'morning': 'Start the day with a high-fiber breakfast, like oatmeal with fruit.',
        'afternoon': 'Choose whole grains, lean proteins, and plenty of vegetables.',
        'night': 'Have a balanced dinner, but be mindful of portion sizes.'
    }
}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/ocr', methods=['POST'])
def ocr():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    keywords = list(food_suggestions.keys())  # Get keywords from the 'food_suggestions' dictionary

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        img = Image.open(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        text = pytesseract.image_to_string(img)

        # Get the user's entered age group (child, adult, or old people)
        user_age_group = request.form.get('age')
        if user_age_group is not None and user_age_group.isdigit():
            user_age_group = int(user_age_group)


        if(user_age_group<=20):
            group="child"
        elif(user_age_group>20 and user_age_group<=50):
            group="adult"
        else:
            group="old_people"

        # Initialize a list to store food suggestions
        food_suggestion_list = []

        # Initialize a dictionary to store nutrients, vitamins, and foods to avoid for different age groups
        nutrients = {
            'tumor': {
                'child': {
                    'morning': {
                        'nutrients': {
                            'antioxidants': 'Berries, green tea',
                            'lean protein': 'Chicken nuggets, cheese',
                            'vegetables': 'Carrots, cucumber',
                            'whole grains': 'Sugary cereals, soda'
                        },
                        'vitamins': 'Vitamin A, Vitamin C',
                        'foods_to_avoid': 'Sugary cereals, soda'
                    },
                    'afternoon': {
                        'nutrients': {
                            'protein': 'Chicken nuggets, cheese',
                            'dairy': 'Milk, cheese sticks',
                            'fruits': 'Apple slices, grapes'
                        },
                        'vitamins': 'Vitamin D, Calcium',
                        'foods_to_avoid': 'Fast food, sugary snacks'
                    },
                    'night': {
                        'nutrients': {
                            'calcium': 'Cheese, yogurt',
                            'vegetables': 'Broccoli, green beans',
                            'protein': 'Eggs, chicken'
                        },
                        'vitamins': 'Vitamin K, Vitamin B12',
                        'foods_to_avoid': 'Candies, ice cream'
                    }
                },
                'adult': {
                    'morning': {
                        'nutrients': {
                            'fiber': 'Oatmeal, fruits',
                            'whole grains': 'Whole wheat toast, muesli',
                            'lean proteins': 'Eggs, Greek yogurt',
                            'vegetables': 'Spinach, tomatoes'
                        },
                        'vitamins': 'Vitamin C, Vitamin D',
                        'foods_to_avoid': 'Sugary cereals, pastries'
                    },
                    'afternoon': {
                        'nutrients': {
                            'protein': 'Chicken breast, tofu',
                            'whole grains': 'Brown rice, quinoa',
                            'vegetables': 'Broccoli, bell peppers'
                        },
                        'vitamins': 'Vitamin B6, Vitamin K',
                        'foods_to_avoid': 'Fast food, sugary drinks'
                    },
                    'night': {
                        'nutrients': {
                            'omega-3 fatty acids': 'Salmon, walnuts',
                            'vegetables': 'Kale, carrots',
                            'protein': 'Lean beef, turkey'
                        },
                        'vitamins': 'Vitamin E, Vitamin A',
                        'foods_to_avoid': 'Processed foods, high-sugar desserts'
                    }
                },
                'old_people': {
                    'morning': {
                        'nutrients': {
                            'fiber': 'Oatmeal, prunes',
                            'whole grains': 'Whole grain cereal, bran muffins',
                            'lean proteins': 'Greek yogurt, cottage cheese',
                            'vegetables': 'Spinach, kale'
                        },
                        'vitamins': 'Vitamin B12, Vitamin D',
                        'foods_to_avoid': 'Sugary cereals, soda'
                    },
                    'afternoon': {
                        'nutrients': {
                            'protein': 'Salmon, chicken',
                            'whole grains': 'Brown rice, barley',
                            'vegetables': 'Broccoli, asparagus'
                        },
                        'vitamins': 'Vitamin C, Vitamin E',
                        'foods_to_avoid': 'Fast food, sugary snacks'
                    },
                    'night': {
                        'nutrients': {
                            'calcium': 'Dairy products, leafy greens',
                            'magnesium': 'Almonds, pumpkin seeds',
                            'protein': 'Tofu, lean beef'
                        },
                        'vitamins': 'Vitamin K, Vitamin A',
                        'foods_to_avoid': 'Candies, ice cream'
                    }
                }
            },
            'sugar': {
                'child': {
                    'morning': {
                        'nutrients': {
                            'fiber': 'Oatmeal, fruits',
                            'whole grains': 'Brown rice, whole wheat bread',
                            'lean proteins': 'Chicken, tofu',
                            'vegetables': 'Kale, carrots'
                        },
                        'vitamins': 'Vitamin A, Vitamin K',
                        'foods_to_avoid': 'Sugary beverages, candies'
                    },
                    'afternoon': {
                        'nutrients': {
                            'protein': 'Lean meats, beans',
                            'fiber': 'Whole grains, legumes',
                            'vegetables': 'Broccoli, asparagus'
                        },
                        'vitamins': 'Vitamin C, Vitamin D',
                        'foods_to_avoid': 'Sugary snacks, white bread'
                    },
                    'night': {
                        'nutrients': {
                            'omega-3 fatty acids': 'Salmon, walnuts',
                            'vegetables': 'Spinach, kale',
                            'protein': 'Chicken, turkey'
                        },
                        'vitamins': 'Vitamin E, Vitamin B12',
                        'foods_to_avoid': 'Sugary desserts, soda'
                    }
                },
                'adult': {
                    'morning': {
                        'nutrients': {
                            'fiber': 'Oatmeal, fruits',
                            'whole grains': 'Whole wheat toast, muesli',
                            'lean proteins': 'Eggs, Greek yogurt',
                            'vegetables': 'Spinach, tomatoes'
                        },
                        'vitamins': 'Vitamin C, Vitamin D',
                        'foods_to_avoid': 'Sugary cereals, pastries'
                    },
                    'afternoon': {
                        'nutrients': {
                            'protein': 'Chicken breast, tofu',
                            'whole grains': 'Brown rice, quinoa',
                            'vegetables': 'Broccoli, bell peppers'
                        },
                        'vitamins': 'Vitamin B6, Vitamin K',
                        'foods_to_avoid': 'Fast food, sugary drinks'
                    },
                    'night': {
                        'nutrients': {
                            'omega-3 fatty acids': 'Salmon, walnuts',
                            'vegetables': 'Kale, carrots',
                            'protein': 'Lean beef, turkey'
                        },
                        'vitamins': 'Vitamin E, Vitamin A',
                        'foods_to_avoid': 'Processed foods, high-sugar desserts'
                    }
                },
                'old_people': {
                    'morning': {
                        'nutrients': {
                            'fiber': 'Oatmeal, prunes',
                            'whole grains': 'Whole grain cereal, bran muffins',
                            'lean proteins': 'Greek yogurt, cottage cheese',
                            'vegetables': 'Spinach, kale'
                        },
                        'vitamins': 'Vitamin B12, Vitamin D',
                        'foods_to_avoid': 'Sugary cereals, soda'
                    },
                    'afternoon': {
                        'nutrients': {
                            'protein': 'Salmon, chicken',
                            'whole grains': 'Brown rice, barley',
                            'vegetables': 'Broccoli, asparagus'
                        },
                        'vitamins': 'Vitamin C, Vitamin E',
                        'foods_to_avoid': 'Fast food, sugary snacks'
                    },
                    'night': {
                        'nutrients': {
                            'calcium': 'Dairy products, leafy greens',
                            'magnesium': 'Almonds, pumpkin seeds',
                            'protein': 'Tofu, lean beef'
                        },
                        'vitamins': 'Vitamin K, Vitamin A',
                        'foods_to_avoid': 'Candies, ice cream'
                    }
                }
            }
        }

        # Check if keywords are found in the extracted text
        for keyword in keywords:
            if keyword.lower() in text.lower():  # Perform a case-insensitive search
                key = keyword.upper()
                food_suggestion = food_suggestions[keyword]
                food_suggestion_list.append(food_suggestion)

        if len(food_suggestion_list) == 0:
            return jsonify({
                'text': "None",
                'found_keywords': "None",  # List of keywords present in the extracted text
                'food_suggestions': "None",
                'nutrients': "None",
                'vitamins': "None",
                'foods_to_avoid': "None",
                'image_location': os.path.join(app.config['UPLOAD_FOLDER'], filename),
                'message': 'Image received successfully'
            })

        return jsonify({
            'text': text,
            'found_keywords': key,  # List of keywords present in the extracted text
            'food_suggestions': food_suggestion_list,
            'nutrients': nutrients[key.lower()][group],
            'image_location': os.path.join(app.config['UPLOAD_FOLDER'], filename),
            'message': 'Image received successfully'
        })

    return jsonify({'error': 'Invalid file format'})

if __name__ == '__main__':
    app.run(debug=True)
