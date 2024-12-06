import { AlertTriangle } from "lucide-react";

interface PageErrorProps {
    message: string;
}

export const PageError = ({ message = "Something went Wrong", }: PageErrorProps) => {
    return (
        <div className="flex flex-colitems-center justify-center h-full">
            <AlertTriangle className="size-7 text-muted-foreground mb-2"/>
            <p className="text-sm font-medium text-muted-foreground">
                {message}
            </p>
        </div>
    );
};