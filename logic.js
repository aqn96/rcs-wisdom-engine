/**
 * RCS Wisdom Engine v1.0
 * Asynchronous logic for fetching and parsing disparate Public REST APIs.
 */

async function main() {
    // 1. Defined sources using a Strategy Pattern for easy extensibility
    const sources = [
        { 
            name: "Motivational", 
            url: "https://zenquotes.io/api/random",
            parse: (data) => ({ text: data[0].q, author: data[0].a })
        },
        { 
            name: "Stoic", 
            url: "https://api.themotivate365.com/stoic-quote",
            parse: (data) => ({ text: data.quote, author: data.author })
        },
        { 
            name: "Advice", 
            url: "https://api.adviceslip.com/advice",
            parse: (data) => ({ text: data.slip.advice, author: "Life Advice" })
        },
        { 
            name: "Tech Humor", 
            url: "https://official-joke-api.appspot.com/jokes/programming/random",
            parse: (data) => ({ 
                text: `${data[0].setup} ... ${data[0].punchline}`, 
                author: "Dev Jokes" 
            })
        }
    ];

    // 2. Load-balance/Randomize source selection
    const selectedSource = sources[Math.floor(Math.random() * sources.length)];

    try {
        // 3. Execute asynchronous network handshake
        const response = await fetch(selectedSource.url);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
        
        const data = await response.json();
        const result = selectedSource.parse(data);
        
        // 4. Construct final payload for Tasker local variable
        const output = `[${selectedSource.name}] "${result.text}" — ${result.author}`;
        
        setLocal('message', output);
    } catch (err) {
        // 5. Fail-safe: Local fallback content if cloud APIs are unreachable
        setLocal('message', "The secret of getting ahead is getting started. — Mark Twain (Engine Fallback)");
    }
    
    // Explicit signal to Tasker that the async event loop is empty
    exit();
}

main();
