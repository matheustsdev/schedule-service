export class Logger {
    public static send(log:string) {
        console.log(`\x1B[35mLog >>\x1B[m ${log}`)

    }
}