/*
# Seed Restaurant Sample Data

Populates all tables with realistic sample data for the Savory Bites restaurant:
- 8 categories
- 16 menu items (foods)
- 6 food reviews
- 4 chefs
- 6 blog posts
- 6 testimonials
- 6 services
- 12 gallery images
- 8 FAQs
- 5 sample customers (including 1 admin)
- 5 sample orders
- 4 sample reservations

Uses ON CONFLICT DO NOTHING so re-running is safe.
*/

-- CATEGORIES
INSERT INTO categories (id, name, icon, description, image) VALUES
(1, 'Pizza', '🍕', 'Wood-fired Italian pizzas with fresh toppings', 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg'),
(2, 'Burgers', '🍔', 'Juicy gourmet burgers with premium beef', 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg'),
(3, 'Pasta', '🍝', 'Authentic Italian pasta dishes', 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'),
(4, 'Salads', '🥗', 'Fresh and healthy salad bowls', 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg'),
(5, 'Desserts', '🍰', 'Sweet treats and decadent desserts', 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg'),
(6, 'Drinks', '🥤', 'Refreshing beverages and fresh juices', 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg'),
(7, 'Seafood', '🦐', 'Fresh seafood from the ocean', 'https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg'),
(8, 'Steaks', '🥩', 'Premium cuts grilled to perfection', 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg')
ON CONFLICT (id) DO NOTHING;

-- FOODS
INSERT INTO foods (id, name, description, category, category_id, ingredients, prep_time, price, old_price, rating, reviews_count, popularity, availability, image, gallery, nutrition, featured, popular, special_offer) VALUES
(1, 'Margherita Pizza', 'Classic wood-fired pizza with fresh mozzarella, basil, and San Marzano tomato sauce.', 'Pizza', 1, '["Fresh mozzarella","Basil leaves","San Marzano tomatoes","Extra virgin olive oil","Pizza dough"]', '20 min', 14.99, 18.99, 4.8, 245, 95, true, 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg', '["https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg","https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg","https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg"]', '{"calories":285,"protein":"12g","carbs":"36g","fat":"10g"}', true, true, true),
(2, 'Pepperoni Supreme Pizza', 'Loaded with pepperoni, mozzarella, bell peppers, and a hint of oregano.', 'Pizza', 1, '["Pepperoni","Mozzarella","Bell peppers","Oregano","Tomato sauce"]', '25 min', 16.99, NULL, 4.7, 198, 90, true, 'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg', '["https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg","https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg"]', '{"calories":320,"protein":"15g","carbs":"38g","fat":"13g"}', false, true, false),
(3, 'Classic Beef Burger', 'Juicy beef patty with cheddar, lettuce, tomato, pickles, and house sauce.', 'Burgers', 2, '["Beef patty","Cheddar cheese","Lettuce","Tomato","Pickles","Brioche bun"]', '15 min', 12.99, 15.99, 4.9, 312, 98, true, 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg', '["https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg","https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg"]', '{"calories":540,"protein":"28g","carbs":"40g","fat":"32g"}', true, true, true),
(4, 'Double Cheese Burger', 'Two beef patties, double cheese, caramelized onions, and smoky BBQ sauce.', 'Burgers', 2, '["Double beef patty","American cheese","Caramelized onions","BBQ sauce","Sesame bun"]', '18 min', 15.49, NULL, 4.8, 267, 92, true, 'https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg', '["https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg"]', '{"calories":720,"protein":"40g","carbs":"45g","fat":"42g"}', false, true, false),
(5, 'Spaghetti Carbonara', 'Creamy Roman pasta with pancetta, egg yolk, parmesan, and black pepper.', 'Pasta', 3, '["Spaghetti","Pancetta","Egg yolk","Parmesan","Black pepper"]', '22 min', 13.99, NULL, 4.7, 178, 85, true, 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg', '["https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg","https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"]', '{"calories":480,"protein":"18g","carbs":"62g","fat":"18g"}', true, false, false),
(6, 'Penne Arrabbiata', 'Spicy tomato sauce with penne pasta, garlic, chili flakes, and fresh basil.', 'Pasta', 3, '["Penne pasta","Tomato sauce","Garlic","Chili flakes","Basil"]', '20 min', 11.99, NULL, 4.6, 142, 78, true, 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', '["https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"]', '{"calories":420,"protein":"14g","carbs":"68g","fat":"12g"}', false, false, true),
(7, 'Caesar Salad', 'Crisp romaine lettuce, croutons, parmesan, and classic Caesar dressing.', 'Salads', 4, '["Romaine lettuce","Croutons","Parmesan","Caesar dressing","Anchovy"]', '10 min', 9.99, NULL, 4.5, 134, 72, true, 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg', '["https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg"]', '{"calories":220,"protein":"8g","carbs":"18g","fat":"14g"}', false, true, false),
(8, 'Greek Salad', 'Tomatoes, cucumbers, red onion, olives, and feta cheese with olive oil.', 'Salads', 4, '["Tomatoes","Cucumber","Red onion","Kalamata olives","Feta cheese"]', '12 min', 10.99, NULL, 4.6, 98, 68, true, 'https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg', '["https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg"]', '{"calories":180,"protein":"6g","carbs":"14g","fat":"12g"}', false, false, false),
(9, 'Chocolate Lava Cake', 'Warm chocolate cake with a molten center, served with vanilla ice cream.', 'Desserts', 5, '["Dark chocolate","Butter","Eggs","Sugar","Flour","Vanilla ice cream"]', '15 min', 8.99, 11.99, 4.9, 287, 94, true, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', '["https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg"]', '{"calories":380,"protein":"6g","carbs":"48g","fat":"20g"}', true, true, true),
(10, 'Tiramisu', 'Italian dessert with espresso-soaked ladyfingers, mascarpone, and cocoa.', 'Desserts', 5, '["Ladyfingers","Mascarpone","Espresso","Cocoa powder","Eggs"]', '30 min', 7.99, NULL, 4.8, 203, 88, true, 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg', '["https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg"]', '{"calories":290,"protein":"5g","carbs":"36g","fat":"14g"}', false, true, false),
(11, 'Fresh Orange Juice', 'Hand-squeezed Valencia oranges, served chilled with no added sugar.', 'Drinks', 6, '["Fresh Valencia oranges"]', '5 min', 4.99, NULL, 4.7, 156, 80, true, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg', '["https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg"]', '{"calories":110,"protein":"2g","carbs":"26g","fat":"0g"}', false, false, false),
(12, 'Mango Smoothie', 'Blended fresh mango with yogurt and a touch of honey.', 'Drinks', 6, '["Fresh mango","Yogurt","Honey","Ice"]', '5 min', 5.99, NULL, 4.8, 112, 82, true, 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg', '["https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg"]', '{"calories":180,"protein":"4g","carbs":"38g","fat":"2g"}', true, true, false),
(13, 'Grilled Salmon', 'Atlantic salmon fillet with lemon butter, asparagus, and herbs.', 'Seafood', 7, '["Salmon fillet","Lemon","Butter","Asparagus","Dill"]', '25 min', 22.99, NULL, 4.9, 189, 91, true, 'https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg', '["https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg"]', '{"calories":380,"protein":"34g","carbs":"8g","fat":"22g"}', true, true, false),
(14, 'Garlic Butter Shrimp', 'Sautéed shrimp in garlic butter sauce with white wine and parsley.', 'Seafood', 7, '["Shrimp","Garlic","Butter","White wine","Parsley"]', '18 min', 18.99, NULL, 4.7, 145, 84, true, 'https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg', '["https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg"]', '{"calories":290,"protein":"28g","carbs":"6g","fat":"16g"}', false, false, true),
(15, 'Ribeye Steak', '12oz ribeye grilled to order with rosemary butter and seasonal vegetables.', 'Steaks', 8, '["Ribeye steak","Rosemary","Butter","Seasonal vegetables","Sea salt"]', '30 min', 28.99, 34.99, 4.9, 234, 96, true, 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg', '["https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg"]', '{"calories":540,"protein":"42g","carbs":"8g","fat":"36g"}', true, true, true),
(16, 'Filet Mignon', 'Tender filet mignon with red wine reduction and truffle mashed potatoes.', 'Steaks', 8, '["Filet mignon","Red wine","Truffle","Potatoes","Butter"]', '35 min', 32.99, NULL, 5.0, 176, 89, true, 'https://images.pexels.com/photos/3627389/pexels-photo-3627389.jpeg', '["https://images.pexels.com/photos/3627389/pexels-photo-3627389.jpeg"]', '{"calories":480,"protein":"44g","carbs":"12g","fat":"28g"}', false, true, false)
ON CONFLICT (id) DO NOTHING;

-- FOOD REVIEWS
INSERT INTO food_reviews (id, food_id, user_name, rating, comment, review_date, avatar) VALUES
(1, 1, 'Alice Johnson', 5, 'Best pizza in town! The crust was perfect.', '2024-09-15', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'),
(2, 1, 'Mark Smith', 4, 'Great flavors, could use a bit more cheese.', '2024-09-20', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'),
(3, 3, 'Sarah Lee', 5, 'Incredible burger! Juicy and flavorful.', '2024-10-01', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'),
(4, 3, 'David Kim', 5, 'My go-to burger. Never disappoints.', '2024-10-05', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'),
(5, 9, 'Emma Wilson', 5, 'The lava cake is to die for! Molten center perfection.', '2024-10-10', 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg'),
(6, 15, 'James Brown', 5, 'Steak was cooked exactly as ordered. Phenomenal.', '2024-10-12', 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg')
ON CONFLICT (id) DO NOTHING;

-- CHEFS
INSERT INTO chefs (id, name, role, specialty, bio, image, social) VALUES
(1, 'Marco Rossi', 'Executive Chef', 'Italian Cuisine', '20+ years crafting authentic Italian dishes with a modern twist.', 'https://images.pexels.com/photos/3814448/pexels-photo-3814448.jpeg', '{"twitter":"#","instagram":"#","facebook":"#"}'),
(2, 'Sophia Chen', 'Pastry Chef', 'Desserts & Pastries', 'Award-winning pastry chef trained in Paris and Tokyo.', 'https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg', '{"twitter":"#","instagram":"#","facebook":"#"}'),
(3, 'James Thompson', 'Head Grill Chef', 'Steaks & Grills', 'Master of the open flame with 15 years of grill expertise.', 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg', '{"twitter":"#","instagram":"#","facebook":"#"}'),
(4, 'Maria Garcia', 'Sous Chef', 'Seafood & Mediterranean', 'Bringing coastal Mediterranean flavors to every plate.', 'https://images.pexels.com/photos/3814448/pexels-photo-3814448.jpeg', '{"twitter":"#","instagram":"#","facebook":"#"}')
ON CONFLICT (id) DO NOTHING;

-- BLOG POSTS
INSERT INTO blog_posts (id, title, excerpt, content, author, author_image, post_date, category, image, tags, read_time) VALUES
(1, '10 Healthy Meals You Can Make in 30 Minutes', 'Discover quick, nutritious recipes that dont compromise on flavor.', 'Eating healthy doesnt have to be time-consuming. Here are our top 10 healthy meals that can be prepared in under 30 minutes. From vibrant salads to protein-packed bowls, these recipes are designed for the busy foodie who refuses to compromise on taste or nutrition. Try our quinoa power bowl, grilled chicken salad, or avocado toast with poached eggs.', 'Sophia Chen', 'https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg', '2024-10-15', 'Healthy Meals', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', '["Healthy","Quick Recipes","Nutrition"]', '5 min'),
(2, 'Were Now Serving Brunch Every Weekend!', 'Exciting news! Join us for a luxurious brunch menu featuring exclusive dishes.', 'We are thrilled to announce our new weekend brunch service! Every Saturday and Sunday from 10 AM to 2 PM, enjoy a special menu featuring eggs benedict, avocado toast, fresh waffles, and our signature brunch cocktails. Reservations are recommended as seats fill up quickly.', 'Marco Rossi', 'https://images.pexels.com/photos/3814448/pexels-photo-3814448.jpeg', '2024-10-10', 'Restaurant News', 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg', '["News","Brunch","Events"]', '3 min'),
(3, '5 Pro Cooking Tips from Our Executive Chef', 'Learn the secrets behind restaurant-quality dishes from Chef Marco Rossi.', 'Chef Marco Rossi shares his top 5 cooking tips: 1. Always season in layers. 2. Let meat rest before slicing. 3. Use fresh herbs liberally. 4. Taste as you cook. 5. Invest in a good knife. These simple tips will transform your home cooking.', 'Marco Rossi', 'https://images.pexels.com/photos/3814448/pexels-photo-3814448.jpeg', '2024-10-05', 'Cooking Tips', 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg', '["Cooking Tips","Chef","Techniques"]', '7 min'),
(4, 'Chef Recommendation: The Perfect Wine Pairing', 'Discover which wines pair best with your favorite dishes.', 'Wine pairing can elevate any meal. Chef Marco recommends: Cabernet Sauvignon with ribeye steak, Pinot Grigio with seafood pasta, Chardonnay with grilled salmon, and a bold Merlot with chocolate desserts. The right wine enhances flavors and creates a memorable dining experience.', 'Maria Garcia', 'https://images.pexels.com/photos/3814448/pexels-photo-3814448.jpeg', '2024-09-28', 'Chef Recommendations', 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg', '["Wine","Pairing","Recommendations"]', '6 min'),
(5, 'Homemade Pasta: A Step-by-Step Recipe', 'Master the art of making fresh pasta at home with just flour and eggs.', 'Making fresh pasta at home is easier than you think. You need 2 cups of flour, 3 eggs, and a pinch of salt. Mound the flour, create a well, crack eggs into it, and mix gradually. Knead for 10 minutes, rest for 30, then roll and cut to your desired shape. Cook in boiling salted water for 2-3 minutes.', 'Marco Rossi', 'https://images.pexels.com/photos/3814448/pexels-photo-3814448.jpeg', '2024-09-20', 'Food Recipes', 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg', '["Recipe","Pasta","Italian"]', '8 min'),
(6, 'The Secret Behind Our Signature Sauce', 'Uncover the ingredients behind our famous house sauce.', 'Our signature sauce has been a closely guarded secret for years. Today, we reveal the key ingredients: San Marzano tomatoes, fresh basil, aged parmesan, a touch of balsamic vinegar, and extra virgin olive oil. The secret is in the slow-simmering process that takes 6 hours to develop the rich, complex flavor.', 'James Thompson', 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg', '2024-09-15', 'Food Recipes', 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg', '["Sauce","Recipe","Secret"]', '5 min')
ON CONFLICT (id) DO NOTHING;

-- TESTIMONIALS
INSERT INTO testimonials (id, name, role, rating, comment, image, post_date) VALUES
(1, 'Jennifer Adams', 'Food Blogger', 5, 'Absolutely the best dining experience Ive ever had. The food was exquisite and the service was impeccable. I will definitely be coming back!', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', '2024-10-01'),
(2, 'Michael Roberts', 'Regular Customer', 5, 'I order from here at least twice a week. The online ordering system is so easy and the food always arrives hot and delicious. Highly recommend the ribeye steak!', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', '2024-09-25'),
(3, 'Linda Martinez', 'Food Critic', 5, 'As a food critic, I have high standards. Savory Bites exceeded every one of them. The margherita pizza is authentic and the lava cake is divine.', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', '2024-09-20'),
(4, 'Robert Wilson', 'Business Owner', 4, 'Great place for business lunches. The ambiance is perfect and the pasta is always fresh. The reservation system made booking effortless.', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', '2024-09-15'),
(5, 'Patricia Taylor', 'Local Foodie', 5, 'The seafood platter was incredible! Fresh, flavorful, and beautifully presented. The staff is friendly and the atmosphere is warm and inviting.', 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg', '2024-09-10'),
(6, 'Christopher Lee', 'Chef Enthusiast', 5, 'I came here to learn and left inspired. Watching the chefs through the open kitchen was a treat. Every dish is a work of art.', 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg', '2024-09-05')
ON CONFLICT (id) DO NOTHING;

-- SERVICES
INSERT INTO services (id, icon, title, description) VALUES
(1, '🍽️', 'Dine-In', 'Experience our warm ambiance and exceptional service in our beautifully designed restaurant space.'),
(2, '🚚', 'Home Delivery', 'Get your favorite meals delivered hot and fresh to your doorstep in 30 minutes or less.'),
(3, '🥡', 'Takeaway', 'Order ahead and pick up your food at your convenience. Quick, easy, and contact-free.'),
(4, '🎉', 'Event Catering', 'Let us cater your special events with customized menus that will impress all your guests.'),
(5, '🎂', 'Birthday Packages', 'Celebrate your special day with our exclusive birthday packages including cake and decorations.'),
(6, '🏢', 'Corporate Dining', 'Business lunches and corporate catering solutions tailored to your company needs.')
ON CONFLICT (id) DO NOTHING;

-- GALLERY IMAGES
INSERT INTO gallery_images (id, image, title, category) VALUES
(1, 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg', 'Margherita Pizza', 'Food'),
(2, 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg', 'Classic Burger', 'Food'),
(3, 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg', 'Restaurant Interior', 'Interior'),
(4, 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg', 'Pasta Dish', 'Food'),
(5, 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg', 'Dining Area', 'Interior'),
(6, 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg', 'Coffee & Dessert', 'Food'),
(7, 'https://images.pexels.com/photos/1817094/pexels-photo-1817094.jpeg', 'Chef at Work', 'Chef'),
(8, 'https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg', 'Pastry Chef', 'Chef'),
(9, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', 'Chocolate Dessert', 'Food'),
(10, 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg', 'Bar Area', 'Interior'),
(11, 'https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg', 'Grilled Salmon', 'Food'),
(12, 'https://images.pexels.com/photos/3814448/pexels-photo-3814448.jpeg', 'Executive Chef', 'Chef')
ON CONFLICT (id) DO NOTHING;

-- FAQS
INSERT INTO faqs (id, question, answer) VALUES
(1, 'What are your opening hours?', 'We are open Monday to Thursday from 11:00 AM to 10:00 PM, and Friday to Sunday from 10:00 AM to 11:00 PM.'),
(2, 'Do you offer vegetarian options?', 'Yes! We have a wide range of vegetarian dishes including salads, pasta, and vegetarian pizzas. Look for the green leaf icon on our menu.'),
(3, 'How long does delivery take?', 'Our standard delivery time is 30-45 minutes depending on your location. You will receive a tracking link once your order is confirmed.'),
(4, 'Can I make a reservation online?', 'Absolutely! Use our reservation page to book a table. You can choose your preferred date, time, and seating area.'),
(5, 'Do you offer catering for events?', 'Yes, we provide full catering services for events of all sizes. Contact us through the contact page for a customized quote.'),
(6, 'What payment methods do you accept?', 'We accept cash on delivery, credit/debit cards, and mobile payment options for both dine-in and delivery orders.'),
(7, 'Is there a minimum order for delivery?', 'The minimum order for home delivery is $15. Orders below this amount can be picked up at our restaurant.'),
(8, 'Can I cancel my order?', 'Orders can be cancelled if they are still in pending status. Once preparation begins, cancellation is no longer possible.')
ON CONFLICT (id) DO NOTHING;

-- CUSTOMERS (including admin)
INSERT INTO customers (id, name, username, email, phone, gender, address, password, role, orders, joined) VALUES
(1, 'Administrator', 'admin', 'admin@savorybites.com', '555-0000', 'Male', 'Restaurant HQ', 'Admin123!', 'admin', 0, '2024-01-01'),
(2, 'Jennifer Adams', 'jadams', 'jennifer@email.com', '555-0101', 'Female', '123 Main St, Springfield', 'Jadams123!', 'customer', 12, '2024-01-15'),
(3, 'Michael Roberts', 'mroberts', 'michael@email.com', '555-0102', 'Male', '456 Oak Ave, Riverside', 'Mroberts123!', 'customer', 24, '2024-02-20'),
(4, 'Linda Martinez', 'lmartinez', 'linda@email.com', '555-0103', 'Female', '789 Elm St, Lakeside', 'Lmartinez123!', 'customer', 8, '2024-03-10'),
(5, 'Robert Wilson', 'rwilson', 'robert@email.com', '555-0104', 'Male', '321 Pine Rd, Hill Valley', 'Rwilson123!', 'customer', 15, '2024-04-05'),
(6, 'Patricia Taylor', 'ptaylor', 'patricia@email.com', '555-0105', 'Female', '654 Maple Dr, Westwood', 'Ptaylor123!', 'customer', 19, '2024-05-12')
ON CONFLICT (id) DO NOTHING;

-- ORDERS
INSERT INTO orders (id, customer_id, customer_name, phone, address, items, subtotal, service_charge, delivery_fee, total, method, payment, status, created_at) VALUES
('ORD-1001', 2, 'Jennifer Adams', '555-0101', '123 Main St, Springfield', '[{"name":"Margherita Pizza","qty":2,"price":14.99}]', 29.98, 1.50, 3.99, 35.47, 'Home Delivery', 'Cash on Delivery', 'delivered', '2024-10-15 19:30:00+00'),
('ORD-1002', 3, 'Michael Roberts', '555-0102', '456 Oak Ave, Riverside', '[{"name":"Ribeye Steak","qty":1,"price":28.99}]', 28.99, 1.45, 3.99, 34.43, 'Home Delivery', 'Cash on Delivery', 'preparing', '2024-10-16 20:00:00+00'),
('ORD-1003', 4, 'Linda Martinez', '555-0103', '789 Elm St, Lakeside', '[{"name":"Classic Beef Burger","qty":2,"price":12.99},{"name":"Chocolate Lava Cake","qty":1,"price":8.99}]', 35.97, 1.80, 3.99, 41.76, 'Pickup', 'Cash on Delivery', 'pending', '2024-10-16 18:00:00+00'),
('ORD-1004', 5, 'Robert Wilson', '555-0104', '321 Pine Rd, Hill Valley', '[{"name":"Spaghetti Carbonara","qty":3,"price":13.99}]', 41.97, 2.10, 3.99, 48.06, 'Home Delivery', 'Cash on Delivery', 'pending', '2024-10-17 12:30:00+00'),
('ORD-1005', 6, 'Patricia Taylor', '555-0105', '654 Maple Dr, Westwood', '[{"name":"Grilled Salmon","qty":2,"price":22.99}]', 45.98, 2.30, 3.99, 52.27, 'Home Delivery', 'Cash on Delivery', 'delivered', '2024-10-17 19:00:00+00')
ON CONFLICT (id) DO NOTHING;

-- RESERVATIONS
INSERT INTO reservations (id, customer_name, phone, email, reservation_date, reservation_time, guests, preference, requests, status) VALUES
('RES-501', 'Jennifer Adams', '555-0101', 'jennifer@email.com', '2024-10-20', '19:00', 4, 'Indoor', 'Window table preferred', 'pending'),
('RES-502', 'Michael Roberts', '555-0102', 'michael@email.com', '2024-10-21', '20:00', 2, 'Outdoor', 'Anniversary dinner', 'approved'),
('RES-503', 'Linda Martinez', '555-0103', 'linda@email.com', '2024-10-22', '18:30', 6, 'Indoor', 'Birthday celebration', 'approved'),
('RES-504', 'Robert Wilson', '555-0104', 'robert@email.com', '2024-10-23', '12:00', 8, 'Indoor', 'Business lunch', 'pending')
ON CONFLICT (id) DO NOTHING;
