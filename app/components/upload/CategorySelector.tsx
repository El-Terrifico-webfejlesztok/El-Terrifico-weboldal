import { useEffect, useState } from 'react';

interface CategorySelectorProps {
    onCategoriesChange: (categories: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategoriesChange }) => {
    const [displayedCategories, setDisplayedCategories] = useState<string[]>([]);
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState<string>('');

    useEffect(() => {
        // Fetch categories from the server when the component mounts
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/product/categories');
                const categoriesData = await response.json();

                if (response.ok) {
                    // Add categories from API to the displayed category list
                    setDisplayedCategories(categoriesData);
                } else {
                    console.error('Error fetching categories:', categoriesData);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (category: string) => {
        // Check if the category is already in the checked list
        const isCategorySelected = checkedCategories.includes(category);

        // Update the checked list based on the current state
        const updatedCheckedCategories = isCategorySelected
            ? checkedCategories.filter((c) => c !== category)
            : [...checkedCategories, category];

        setCheckedCategories(updatedCheckedCategories);
        onCategoriesChange(updatedCheckedCategories);

        // Log the updated checked categories for testing
        // console.log('Updated Checked Categories:', updatedCheckedCategories);
    };

    const handleNewCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(event.target.value);
    };

    const handleAddCategory = () => {
        // Check for empty category
        if (!newCategory) {
            console.error('New category cannot be empty.');
            return;
        }

        // Check for duplicate category
        if (displayedCategories.some((c) => c.trim() === newCategory.trim())) {
            console.error('Category already exists.');
            return;
        }

        // Add the new category to the displayed and checked lists
        const updatedDisplayedCategories = [...displayedCategories, newCategory];
        const updatedCheckedCategories = [...checkedCategories, newCategory];

        setDisplayedCategories(updatedDisplayedCategories);
        setCheckedCategories(updatedCheckedCategories);
        onCategoriesChange(updatedCheckedCategories);

        // Clear the new category input
        setNewCategory('');
    };

    const handleNewCategoryKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Check if the Enter key is pressed
        if (event.key === 'Enter') {
            // Prevent the default Enter key behavior (e.g., form submission)
            event.preventDefault();

            // Trigger the handleAddCategory function
            handleAddCategory();
        }
    };

    return (
        <div>
            <div className='mb-4'>
                <label className='form-control'>
                    <div className='flex items-center'>
                        <div className="mx-0 tooltip" data-tip="A kategória a termékkel együtt kerül feltöltésre">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        Új kategória hozzáadása:
                    </div>
                </label>
                <div className='join w-full'>
                    <button className='btn join-item' type="button" onClick={handleAddCategory}>
                        Hozzáadás
                    </button>
                    <input
                        className='input input-bordered join-item w-full'
                        type="text"
                        value={newCategory}
                        onChange={handleNewCategoryChange}
                        onKeyDown={handleNewCategoryKeyDown}
                    />
                </div>
            </div>

            Kategóriák kiválasztása:
            <div className='grid grid-cols-2 gap-1'>
                {displayedCategories.map((category) => (
                    <label key={category} className='label cursor-pointer'>
                        <span className='label-text'>{category}</span>
                        <input
                            className='checkbox ani'
                            type="checkbox"
                            checked={checkedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                        />
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CategorySelector;
