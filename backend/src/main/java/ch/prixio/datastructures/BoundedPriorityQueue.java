package ch.prixio.datastructures;

import java.util.*;
import java.util.stream.Stream;

public class BoundedPriorityQueue<T> {
	private final PriorityQueue<T> queue;
	private final int capacity;

	public BoundedPriorityQueue(int capacity, Comparator<T> comparator) {
		this.capacity = capacity;
		this.queue = new PriorityQueue<>(capacity + 1, comparator);
	}

	public void offer(T element) {
		this.queue.offer(element);

		// Remove lesser element
		if (this.isOverflowing()) this.queue.poll();
	}

	public T peek() {
		return this.queue.peek();
	}

	public boolean isFull() {
		return this.queue.size() == this.capacity;
	}

	private boolean isOverflowing() {
		return this.queue.size() > this.capacity;
	}

	public int size() {
		return this.queue.size();
	}

	public List<T> toList() {
		return new ArrayList<>(this.queue);
	}

	public Stream<T> stream() {
		return this.queue.stream();
	}
}
