FROM postgres:15

# Set environment variables for creating the database
ENV POSTGRES_USER=amalzen
ENV POSTGRES_PASSWORD=amalzen
ENV POSTGRES_DB=car_languages

# Expose default PostgreSQL port
EXPOSE 5432

# Health check to verify database is running
HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
  CMD pg_isready -d $POSTGRES_DB -U $POSTGRES_USER || exit 1

# Create a volume to persist data outside the container
VOLUME ["/var/lib/postgresql/data"]

# To Run the Container
# docker build -t car_languages_db .