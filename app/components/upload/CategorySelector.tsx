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
            ? checkedCategories.filter((c) => c !== category) // If selected, remove from the checked list
            : [...checkedCategories, category]; // If not selected, add to the checked list

        setCheckedCategories(updatedCheckedCategories);
        onCategoriesChange(updatedCheckedCategories);

        // Log the updated checked categories for testing
        console.log('Updated Checked Categories:', updatedCheckedCategories);
    };

    const handleNewCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(event.target.value);
    };

    const handleAddCategory = () => {
        // Add the new category to the displayed list and the checked list if it doesn't already exist
        if (newCategory.trim() !== '' && !displayedCategories.includes(newCategory.trim())) {
            const updatedDisplayedCategories = [...displayedCategories, newCategory.trim()];
            const updatedCheckedCategories = [...checkedCategories, newCategory.trim()];

            setDisplayedCategories(updatedDisplayedCategories);
            setCheckedCategories(updatedCheckedCategories);
            onCategoriesChange(updatedCheckedCategories);
            setNewCategory('');

            // Log the updated checked categories for testing
            console.log('Updated Checked Categories:', updatedCheckedCategories);
        }
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
            <div className='mb-2'>
                <label className='form-control'>Add New Category:</label>
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
