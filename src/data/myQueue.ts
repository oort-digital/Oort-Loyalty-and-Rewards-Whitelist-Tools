export default class MyQueue<T> {
    private items: T[]
    private count: number
    private header: number

    constructor() {
        this.items = [];
        this.count = this.header = 0
    }

    /**
     * 入队列
     * @param element
     * @returns 当前队列的数量
     */
    enqueue(element: T): number {
        this.items[this.count++] = element
        return this.size()
    }

    /**
     * 出队列
     * @returns 出队列的元素
     */
    dequeue(): T | undefined {
        if (this.isEmpty()) return undefined
        const res = this.items[this.header]
        delete this.items[this.header]
        this.header++
        return res
    }

    /**
     * 查看队首的元素
     * @return 队首位的元素
     */
    peek(): T | undefined {
        if (this.isEmpty()) return undefined
        return this.items[this.header]
    }

    /**
     * 返回队列中元素的个数
     * @returns count
     */
    size(): number {
        return this.count - this.header
    }

    /**
     * 返回队列是否为空
     * @returns boolean
     */
    isEmpty(): boolean {
        return this.size() === 0
    }

    /**
     * 清空队列
     */
    clear(): void {
        this.items = [];
        this.header = this.count = 0
    }
}
