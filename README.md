# Getting Started with Create React App

<h2>🛠️ Installation Steps:</h2>

<p>1. $ git clone {the url to the GitHub repo}</p>

```
This clones the repo cd into the new folder and type $ npm install to install all dependencies
```

<p>2. $ npm install</p>

```
$ npm install
```

<p>3. $ npm start</p>

```
$ npm start
```

Interview Assessment
During the interview assessment, I successfully completed most of the tasks assigned, creating a product list and a product picker with various features. However, two functionalities remained incomplete: the drag and drop feature in the product list and pagination in the search function of the product picker.

Components Developed:

I worked on two components for the assessment:

Product List: This component enables users to sort and filter products based on various options. I implemented features for organizing and customizing products.
Product Picker: The product picker component allows users to search for products using a search bar and select them.
Implemented Features:

Discounts: Implemented discounts on the product level, recognizing the need to extend this functionality to the variant level to accommodate different discount ranges for various variants.
Displaying Discounted Prices: Previously, only discounted numbers were shown, but now, discounted prices are also displayed for better clarity.
Challenges Faced:

Drag and Drop Feature: I attempted to incorporate the drag and drop functionality using react-dnd but encountered challenges and ultimately opted for a static interface due to time constraints. However, the react-dnd package remains part of the dependencies as it was tested during development.
Suggestions for Improvement:

UI/UX Enhancements: Enhance the color combinations for a better user experience.
Quantity Counter: Introduce a quantity counter in the product list to allow users to increase or decrease the quantity of selected products.
Performance Optimization: Implement Skeleton CSS for smoother transitions and lazy loading for improved performance, especially with large product lists.
UI Library Integration: Consider integrating a UI library to streamline styling efforts and maintain consistency throughout the application. 
Responsive Design: Ensure the application is fully responsive across various devices and screen sizes to provide a seamless user experience.
Error Handling: Implement robust error handling mechanisms to gracefully handle errors and provide informative error messages to users when unexpected issues occur.
