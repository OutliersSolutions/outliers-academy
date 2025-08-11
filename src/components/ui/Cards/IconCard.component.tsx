interface IconCardProps {
    image: string
    label?: string
}

export const IconCard = ({ image, label }: IconCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img
                src={image}
                alt={label || "technology-icon"}
                className="h-40 w-40 object-contain"
                draggable="false"
            />

        </div>
    )
}