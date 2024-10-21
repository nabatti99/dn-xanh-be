export function shortenObject(data: Record<string, any>, limitRecursion: number = 5): Record<string, any> {
    const entries = Object.entries(data);
    const stringifiedEntries = entries.reduce(
        (result, [key, value]) => {
            if (limitRecursion < 0) return result;

            if (value instanceof Object) value = shortenObject(value, limitRecursion - 1);
            else if (value instanceof String && value.length > 100) value = `${value.slice(0, 100)}...`;
            else {
                try {
                    value = String(value);
                } catch {
                    return result;
                }
            }

            result.push([key, value]);
            return result;
        },
        [] as [string, any][]
    );

    return Object.fromEntries(stringifiedEntries);
}

export function stringifyLog(...logs: any[]) {
    const messages: string[] = logs
        .filter((log) => Boolean(log))
        .map((log) => {
            if (log instanceof Error)
                log = JSON.stringify(
                    shortenObject({
                        message: log.message,
                        stack: log.stack,
                    }),
                    null,
                    2
                );
            if (log instanceof Object) log = JSON.stringify(shortenObject(log), null, 2);

            return String(log).split("\n").join(" | ");
        });

    return messages.join(" | ").replace(/\s+/g, " ");
}
