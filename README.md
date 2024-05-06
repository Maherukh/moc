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

<h2>Interview Assessment</h2>
During the interview assessment, I successfully completed most of the tasks assigned, creating a product list and a product picker with various features. However, two functionalities remained incomplete: the drag and drop feature in the product list and pagination in the search function of the product picker.

<h3>Components Developed:</h3>
I worked on two components for the assessment:

<b>Product List:</b> This component enables users to sort and filter products based on various options. I implemented features for organizing and customizing products.

<b>Product Picker:</b> The product picker component allows users to search for products using a search bar and select them.
Implemented Features:

<b>Discounts:</b> Implemented discounts on the product level, recognizing the need to extend this functionality to the variant level to accommodate different discount ranges for various variants.

<b>Displaying Discounted Prices:</b> Previously, only discounted numbers were shown, but now, discounted prices are also displayed for better clarity.

<h3>Challenges Faced:</h3>
Drag and Drop Feature: I attempted to incorporate the drag and drop functionality using react-dnd but encountered challenges and ultimately opted for a static interface due to time constraints. However, the react-dnd package remains part of the dependencies as it was tested during development.

<h3>Suggestions for Improvement:</h3>

- <b>UI/UX Enhancements:</b> Enhance the color combinations for a better user experience.

- <b>Quantity Counter:</b> Introduce a quantity counter in the product list to allow users to increase or decrease the quantity of selected products.
  
- <b>Performance Optimization:</b> Implement Skeleton CSS for smoother transitions and lazy loading for improved performance, especially with large product lists.
  
- <b>UI Library Integration:</b> Consider integrating a UI library to streamline styling efforts and maintain consistency throughout the application.
  
- <b>Responsive Design:</b> Ensure the application is fully responsive across various devices and screen sizes to provide a seamless user experience.
  
- <b>Error Handling:</b> Implement robust error handling mechanisms to gracefully handle errors and provide informative error messages to users when unexpected issues occur.
