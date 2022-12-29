class Process {
    public name: string = "";
    public Alocation: number[] = [];
    public Max: number[] = [];
    public Need?: number[] = [];
    public Finish?: boolean = false;
}

class Banker {
    public Available: number[] = [];
    public Processes: Process[] = [];
    public request: number[] = [];
    public requestProcessName: string = "";
    private work: number[] = [];
    constructor(avail: number[], processes: Process[]) {
        this.Available = avail;
        this.Processes = processes;
        this.work = [...this.Available];
    }

    public requestResource(processName: string, request: number[]): boolean {
        // request <= Available
        for (let i = 0; i < request.length; i++) {
            if (request[i] > this.Available[i]) {
                return false;
            }
        }
        this.request = request;
        this.requestProcessName = processName;
        return true;
    }

    public isSafe(): boolean {
        this.work = [...this.Available];
        for (let i = 0; i < this.Available.length; i++) {
            this.work[i] -= this.request[i];
        }
        console.log("work", this.work);

        let needUpdateAlocation = this.Processes.find((p) => p.name === this.requestProcessName);
        if (needUpdateAlocation) {
            for (let i = 0; i < needUpdateAlocation.Alocation.length; i++) {
                needUpdateAlocation.Alocation[i] += this.request[i];
            }
        } else {
            throw new Error("request process not found");
        }
        this.Processes.forEach((p) => {
            p.Need = p.Max.map((m, i) => m - p.Alocation[i]);
            console.log(p.name, p.Need);
        });
        let beforeStatus = new Set<string>();
        while (true) {
            // this.Processes.forEach((p) => {
            //     if (!p.Finish && this.checkFinish(p.Need!)) {
            //         this.updateWork(p.Alocation);
            //         p.Finish = true;
            //         console.log(p.name, true);
            //     } else {
            //         if (!p.Finish) console.log(p.name, false);
            //         else console.log(p.name, "finish!");
            //     }
            // });
            // change to for i
            for (let i = 0; i < this.Processes.length; i++) {
                if (!this.Processes[i].Finish && this.checkFinish(this.Processes[i].Need!)) {
                    this.updateWork(this.Processes[i].Alocation);
                    this.Processes[i].Finish = true;
                    console.log(this.Processes[i].name, true);
                    break;
                } else {
                    if (!this.Processes[i].Finish) console.log(this.Processes[i].name, false);
                    else console.log(this.Processes[i].name, "finish!");
                }
            }
            if (this.Processes.every((p) => p.Finish)) {
                return true;
            }
            let status = this.Processes.map((p) => p.Finish).join("");
            if (beforeStatus.has(status)) {
                return false;
            } else {
                beforeStatus.add(status);
            }
        }
    }
    public checkFinish(need: number[]): boolean {
        for (let i = 0; i < need.length; i++) {
            if (need[i] > this.work[i]) {
                return false;
            }
        }
        return true;
    }
    public updateWork(alocation: number[]): void {
        for (let i = 0; i < alocation.length; i++) {
            this.work[i] += alocation[i];
        }
    }
}

const main = () => {
    const processes: Process[] = [
        {
            name: "P0",
            Alocation: [3, 0, 1],
            Max: [10, 7, 4],
        },
        {
            name: "P1",
            Alocation: [3, 2, 1],
            Max: [8, 5, 3],
        },
        {
            name: "P2",
            Alocation: [2, 1, 3],
            Max: [6, 3, 4],
        },
        {
            name: "P3",
            Alocation: [0, 3, 0],
            Max: [9, 6, 3],
        },
        {
            name: "P4",
            Alocation: [1, 1, 2],
            Max: [7, 4, 5],
        },
    ];
    const banker = new Banker([6, 2, 2], processes);
    console.log(banker.requestResource("P1", [1, 1, 0]));
    const isSafe = banker.isSafe();
    console.log(isSafe);
};

main();
