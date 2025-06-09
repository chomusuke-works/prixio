package ch.prixio.daos;

import java.io.Closeable;
import java.sql.Connection;
import java.sql.SQLException;

public abstract class DAO implements Closeable {
	protected final Connection connection;

	public DAO(Connection connection) {
		this.connection = connection;
	}

	public void close() {
		try {
			this.connection.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
}
