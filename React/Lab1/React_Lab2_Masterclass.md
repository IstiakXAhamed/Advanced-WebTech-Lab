# The Comprehensive React Masterclass: Lab 2 - Interactivity & State

*This document continues your journey from Lab 1. You will take your static Student Dashboard and make it fully interactive using React's two most powerful Hooks: `useState` and `useEffect`.*

---

## Table of Contents
1. **The Core Concepts:** State (`useState`) and Side Effects (`useEffect`)
2. **Task 1: The Simulated API Fetch** (Loading states and timers)
3. **Task 2: Live Search** (Derived state and filtering)
4. **Task 3: Favorite Toggle & State Lifting** (Child-to-Parent communication)
5. **Task 4: Dynamic Document Title** (Browser interactions)
6. **Task 5: Sort Controls** (Array manipulation)

---

## 1. The Core Concepts: State and Side Effects

Up until now, your React app has been "static". The data was hardcoded, and the screen never changed after the initial load. To make an app interactive, it needs to **remember things** and **react to changes**.

### Concept 1: `useState` (The Component's Memory)
If you define a normal JavaScript variable `let score = 0;` and change it to `score = 1;`, React **will not care**. The screen will not update. 
If you want React to update the screen when data changes, you must use `useState`.
```jsx
// You import it from react
import { useState } from 'react';

// You use it inside your component
const [count, setCount] = useState(0);
```
*   `count` is the memory (the current value).
*   `setCount` is the ONLY way you are allowed to change the memory. When you call `setCount(1)`, React says, "Ah! The state changed! I must redraw the screen!"

### Concept 2: `useEffect` (The Side Effect Manager)
A component's main job is to render HTML. Anything else it does (fetching data from the internet, changing the browser tab title, setting a timer) is considered a **Side Effect**.
`useEffect` lets you run code *outside* of the normal rendering cycle.
```jsx
import { useEffect } from 'react';

useEffect(() => {
  // This code runs AFTER the component appears on screen!
  console.log("Hello from the side effect!");
}, []); // The empty array means "Only run this once!"
```

---

## Task 1: Simulated API Fetch

Right now, your `studentDatabase` is hardcoded inside `App.jsx`. In the real world, you fetch this data from a database, which takes time. We will simulate this using a timer.

**Goal:** Show a "Loading..." spinner for 1.5 seconds, then display the students.

**Open `src/App.jsx` and update it:**

```jsx
import { useState, useEffect } from 'react'; // 1. Import the hooks
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';

// We move the raw data OUTSIDE the component so it acts like a fake database
const FAKE_DATABASE = [
    {
      id: "22-48998-3", name: "MD ISTIAK AHAMED", avatar: "../../resources/Sanim.jpg", gpa: 3.98, major: "Computational Theory",
      courses: [{ name: "Adv Webtec", color: "#ef4444" },{name:"NLP",color:"#3b82f6"}]
    },
    // ... (Keep the rest of your students here)
];

export default function App() {
  // 2. Create state for our students (starts empty!)
  const [students, setStudents] = useState([]);
  
  // 3. Create state to track if we are currently loading
  const [isLoading, setIsLoading] = useState(true);

  // 4. Use an effect to simulate fetching data when the app first loads
  useEffect(() => {
    // Set a timer for 1.5 seconds (1500 milliseconds)
    const timer = setTimeout(() => {
      setStudents(FAKE_DATABASE); // Give the data to React
      setIsLoading(false);        // Tell React we are done loading
    }, 1500);

    // Cleanup function in case the component is destroyed before timer finishes
    return () => clearTimeout(timer);
  }, []); // Empty array = run exactly once when App loads!

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <DashboardHeader 
        title="American International University-Bangladesh Administration" 
        tagline="Centralized Student Information System" 
      />

      {/* 5. Conditional Rendering: If loading is true, show a spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student) => (
            <StudentCard 
              key={student.id}
              {...student} 
              // (...student is a shortcut to pass all properties like id={student.id} name={student.name} automatically!)
            />
          ))}
        </div>
      )}
    </div>
  );
}
```
**What did we learn?** `isLoading ? (Show this) : (Show that)` is how React handles loading screens!

---

## Task 2: Adding a Live Search (Filtering as we type)

Okay, next up is the search bar. The goal here is simple: as the user types into an input box, the student list should instantly shrink to only show matching names or majors. 

To do this, our `App` needs to "remember" what the user is typing. We'll use a new `useState` for the search query.

**1. Building the Search Bar Component:**
You've probably already created `src/components/SearchBar.jsx`. It's just a simple wrapper around an HTML `<input>`. The important part is that it receives `searchQuery` (the current text) and `onSearchChange` (a function to update the text) as props from the App.

**2. Hooking it up in `App.jsx`:**
Open your `App.jsx` and let's add the memory for the search box. Put this right below your `isLoading` state:

```jsx
// This remembers what we typed in the search box
const [searchQuery, setSearchQuery] = useState("");
```

Now, instead of just displaying all `students`, we want to create a smaller, temporary list of students that match the search query. We do this *before* the `return` statement:

```jsx
// We filter the students array based on the search query.
// If searchQuery is empty, it just returns everyone!
const filteredStudents = students.filter((student) => {
  // We convert both to lowercase so that "A" matches "a"
  const lowerCaseQuery = searchQuery.toLowerCase();
  
  return (
    student.name.toLowerCase().includes(lowerCaseQuery) ||
    student.major.toLowerCase().includes(lowerCaseQuery)
  );
});
```

Finally, go down into your `return` block. We need to actually display the `<SearchBar />` (make sure to import it at the top!), and then change our `.map()` to loop over `filteredStudents` instead of `students`.

```jsx
{/* Add the search bar right above the student grid */}
<SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Notice we are mapping filteredStudents now, not the raw students array! */}
  {filteredStudents.map((student) => (
    <StudentCard key={student.id} {...student} />
  ))}
</div>
```

---

## Task 3: The Favorite Button & "State Lifting"

This is probably the hardest concept to grasp, so let's break it down. 
We want to add a "Favorite" (♥) button inside each `StudentCard`. But we *also* want to show the total number of favorited students way up at the top in the `DashboardHeader`.

**The Problem:** React data only flows downwards. The `StudentCard` can't magically send data up to the `DashboardHeader`. 
**The Solution:** We put the `favoritesCount` state in the "Boss" component (`App.jsx`), because `App.jsx` is the parent of both the Header and the Card. `App.jsx` will pass down a special function to the Card to let the Card update the count!

**1. The Boss (`App.jsx`) sets up the state and function:**
```jsx
// Add this state to App.jsx to keep track of total favorites
const [favoritesCount, setFavoritesCount] = useState(0);

// This is the function we will pass down to the StudentCards
const handleFavoriteToggle = (isFavorited) => {
  if (isFavorited) {
    setFavoritesCount(favoritesCount + 1); // They clicked heart, add 1
  } else {
    setFavoritesCount(favoritesCount - 1); // They unclicked heart, subtract 1
  }
};
```

Now, pass these down to the children in your `return` block:
*   Update your header: `<DashboardHeader title="..." tagline="..." favoritesCount={favoritesCount} />`
*   Update your card: `<StudentCard key={student.id} {...student} onToggleFavorite={handleFavoriteToggle} />`

**2. Update the Header (`DashboardHeader.jsx`):**
Catch the `favoritesCount` prop and display it.
```jsx
export default function DashboardHeader({ title, tagline, favoritesCount }) {
  return (
    <header className="mb-8 pb-4 border-b border-slate-700 flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-extrabold text-indigo-500 mb-2">{title}</h1>
        <p className="text-slate-400 m-0">{tagline}</p>
      </div>
      
      {/* This right-side box shows the total favorites! */}
      <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-lg font-bold">
        Favorites: {favoritesCount}
      </div>
    </header>
  );
}
```

**3. Build the actual button in `StudentCard.jsx`:**
The card needs to remember if it is currently favorited or not so it knows what color the heart should be.

```jsx
import { useState } from 'react'; // Don't forget to import useState here too!

// Make sure to catch the new onToggleFavorite prop!
export default function StudentCard({ name, id, avatar, gpa, major, courses, onToggleFavorite }) {
  
  // Local memory just for this specific card
  const [isFavorite, setIsFavorite] = useState(false);

  const handleHeartClick = () => {
    const newFavoriteState = !isFavorite; // Flip it (true becomes false, false becomes true)
    setIsFavorite(newFavoriteState); // Update the visual color of the heart
    onToggleFavorite(newFavoriteState); // Tell App.jsx to update the total counter!
  };

  return (
    // Make sure the main wrapper div has 'relative' so we can position the heart in the corner
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg relative ...">
      
      {/* The actual Favorite Button */}
      <button 
        onClick={handleHeartClick}
        className={`absolute top-4 right-4 text-2xl transition-colors ${isFavorite ? 'text-red-500' : 'text-slate-600 hover:text-red-400'}`}
      >
        ♥
      </button>
      
      {/* ... rest of your card code ... */}
```

---

## Task 4: Dynamic Browser Tab Title

This one is quick but really cool. We want the browser's tab (right at the top of Google Chrome/Edge) to dynamically say how many students are currently on the screen.

Since interacting with the browser window is outside of React's normal HTML rendering, it's considered a "Side Effect". We need `useEffect`.

**Add this to `App.jsx`:**
```jsx
// This effect watches the filtered list. Whenever the list changes (because we searched), it updates the tab!
useEffect(() => {
  if (isLoading) {
    document.title = "Loading Dashboard...";
  } else {
    document.title = `Dashboard - ${filteredStudents.length} Students`;
  }
}, [filteredStudents.length, isLoading]); 
// The array above is the "Dependency Array". It tells React to only run this effect if length or isLoading changes.
```

---

## Task 5: Sorting the Students

Finally, let's add buttons to sort the students alphabetically or by GPA.

**1. Create the Component (`SortControls.jsx`):**
This is just a row of three buttons (Default, Name, GPA). Whenever a button is clicked, it sends the sorting type ('name', 'gpa', or 'default') back to `App.jsx` via an `onSortChange` prop.

**2. Apply the Logic in `App.jsx`:**
First, add memory for the sorting choice:
```jsx
const [sortType, setSortType] = useState('default');
```

Now for the logic. We already have `filteredStudents`. Before we give them to the `.map()` function to render, we need to sort them!
*Note: In JavaScript, `.sort()` permanently scrambles the original array. In React, mutating data directly is a big no-no. So we make a quick copy of the array using `[...filteredStudents]` before sorting it.*

```jsx
// Add this right below where you created filteredStudents
const sortedAndFilteredStudents = [...filteredStudents].sort((a, b) => {
  if (sortType === 'name') {
    return a.name.localeCompare(b.name); // This is how you sort strings alphabetically
  } else if (sortType === 'gpa') {
    return b.gpa - a.gpa; // This sorts numbers from High to Low
  }
  return 0; // 'default' means we don't change the order
});
```

Finally, put your `<SortControls currentSort={sortType} onSortChange={setSortType} />` in your `return` block (usually right next to the SearchBar), and update your mapping one last time to use `sortedAndFilteredStudents.map(...)`.

And that's it! You've just built a fully interactive React application using State, Props, and Effects. Take your time writing the code out, and it will all start to click!
