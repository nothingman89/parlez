from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables.

    Attributes:
        app_name: Display name for the application
        debug: Enable debug mode for development
    """
    app_name: str = "Parlez"
    debug: bool = False

    class Config:
        env_file = ".env"  # Automatically load variables from .env file


settings = Settings()  # Singleton instance used throughout the app
