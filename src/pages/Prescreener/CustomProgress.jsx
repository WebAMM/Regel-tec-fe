const CustomProgress = ({ value, total }) => {
    const percent = (value / total) * 100;
    return (
        <div className="w-full bg-[#00B4F11A] rounded-full h-2 mb-6">
            <div
                className="bg-[#00B4F1] h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${percent}%` }}
            />
        </div>
    );
};

export default CustomProgress