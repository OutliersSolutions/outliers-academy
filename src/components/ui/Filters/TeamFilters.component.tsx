import { Button } from "../Buttons/Button.component";

interface TeamFiltersProps {
    filters: string[];
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

export const TeamFilters = ({ filters, activeFilter, setActiveFilter }: TeamFiltersProps) => {
    return (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button
                variant={activeFilter === "Todos" ? "default" : "outline"}
                onClick={() => setActiveFilter("Todos")}
                className={activeFilter === "Todos" ? "bg-coral-500 hover:bg-coral-600" : "hover:border-coral-300 hover:text-coral-600"}
            >
                Todos
            </Button>
            {filters.map((filter) => (
                <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    onClick={() => setActiveFilter(filter)}
                    className={activeFilter === filter ? "bg-coral-500 hover:bg-coral-600" : "hover:border-coral-300 hover:text-coral-600"}
                >
                    {filter}
                </Button>
            ))}
        </div>
    );
};

